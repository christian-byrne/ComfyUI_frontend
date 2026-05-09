/**
 * SlotDefaults — rewritten with the v2 extension API.
 *
 * v1 used `init` + `beforeRegisterNodeDef` + direct `app.ui.settings.addSetting`.
 * v2 uses `defineExtension({ setup(ext) })`. The `ExtensionManager` passed to
 * `setup` exposes `setting.get/set` but NOT `addSetting` — that gap is noted below.
 *
 * What this file demonstrates to Simon/Austin:
 *  1. App-level extensions (init/setup) map cleanly to `defineExtension`.
 *  2. `beforeRegisterNodeDef` has no v2 equivalent — node type metadata is not
 *     surfaced through the v2 API at registration time.
 *  3. `app.ui.settings.addSetting` (declares a new setting with slider + label)
 *     has no v2 `ExtensionManager` surface.
 *
 * API GAPS (feedback items for Simon/Austin):
 *  GAP-4: No `beforeRegisterNodeDef` hook on `ExtensionOptions`. This hook
 *         fires *once per node type*, before any instance exists, giving access
 *         to `nodeData` (input/output schema). Needed for type-level analysis
 *         (e.g. slot type registry). Candidate: `onNodeTypeRegistered(typeDef)`.
 *  GAP-5: `ExtensionManager.setting` exposes only `get/set`. It does NOT
 *         expose `addSetting` (declare a new setting with UI metadata, type,
 *         default, onChange callback). Needed for extensions that contribute
 *         settings to the settings dialog. Candidate: extend the `setting`
 *         interface with `add(spec: SettingSpec)`.
 *  GAP-6: `LiteGraph.registered_slot_in_types` / `slot_types_out` are
 *         global LiteGraph state mutated here. No v2 abstraction exists for
 *         the "node suggestions" subsystem. Low priority — this is fine to
 *         keep calling LiteGraph directly as an implementation detail.
 *
 * Interim strategy: `setup()` falls back to direct LiteGraph manipulation for
 * slot type data. The settings contribution stays as a TODO annotation until
 * GAP-5 is resolved.
 */

import { LiteGraph } from '@/lib/litegraph/src/litegraph'
import { ComfyWidgets } from '../../scripts/widgets'
import { defineExtension } from '@/extension-api'
import type { ExtensionManager } from '@/extension-api'

// Type of the slot-type accumulator (mirrors v1's extension-instance fields).
interface SlotTypeAccumulator {
  slot_types_default_out: Record<string, string[]>
  slot_types_default_in: Record<string, string[]>
}

const acc: SlotTypeAccumulator = {
  slot_types_default_out: {},
  slot_types_default_in: {}
}

let maxSuggestions: number = 5

function applyDefaults() {
  LiteGraph.slot_types_default_out = {}
  LiteGraph.slot_types_default_in = {}
  for (const type in acc.slot_types_default_out) {
    LiteGraph.slot_types_default_out[type] = acc.slot_types_default_out[
      type
    ].slice(0, maxSuggestions)
  }
  for (const type in acc.slot_types_default_in) {
    LiteGraph.slot_types_default_in[type] = acc.slot_types_default_in[
      type
    ].slice(0, maxSuggestions)
  }
}

// GAP-4: In v1 this was `beforeRegisterNodeDef(nodeType, nodeData)`.
// In v2 there is no equivalent hook. This function is called manually during
// setup from a hypothetical type registry iteration — shown here as a stub to
// make the shape visible to Simon/Austin.
function processNodeDef(
  nodeId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodeData: { input?: { required?: Record<string, unknown[]> }; output?: string[] },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodeType: { comfyClass?: string }
) {
  const inputs = nodeData.input?.required ?? {}
  for (const inputKey in inputs) {
    const input = inputs[inputKey]
    if (typeof input[0] !== 'string') continue
    const type = input[0] as string
    if (type in ComfyWidgets) {
      const customProperties = input[1] as Record<string, unknown> | undefined
      if (!customProperties?.forceInput) continue
    }
    if (!(type in acc.slot_types_default_out)) {
      acc.slot_types_default_out[type] = ['Reroute']
    }
    if (!acc.slot_types_default_out[type].includes(nodeId)) {
      acc.slot_types_default_out[type].push(nodeId)
    }
    const lowerType = type.toLocaleLowerCase()
    if (!(lowerType in LiteGraph.registered_slot_in_types)) {
      LiteGraph.registered_slot_in_types[lowerType] = { nodes: [] }
    }
    LiteGraph.registered_slot_in_types[lowerType].nodes.push(
      nodeType.comfyClass ?? nodeId
    )
  }
  for (const el of nodeData.output ?? []) {
    const type = el
    if (!(type in acc.slot_types_default_in)) {
      acc.slot_types_default_in[type] = ['Reroute']
    }
    if (!acc.slot_types_default_in[type].includes(nodeId)) {
      acc.slot_types_default_in[type].push(nodeId)
    }
    if (!(type in LiteGraph.registered_slot_out_types)) {
      LiteGraph.registered_slot_out_types[type] = { nodes: [] }
    }
    // @ts-expect-error comfyClass
    LiteGraph.registered_slot_out_types[type].nodes.push(nodeType.comfyClass ?? nodeId)
    if (!LiteGraph.slot_types_out.includes(type)) {
      LiteGraph.slot_types_out.push(type)
    }
  }
  applyDefaults()
}

// ── v2 registration ──────────────────────────────────────────────────────────

defineExtension({
  name: 'Comfy.SlotDefaults.V2',

  init() {
    LiteGraph.search_filter_enabled = true
  },

  setup(_ext: ExtensionManager) {
    // GAP-5: In v1, `app.ui.settings.addSetting(spec)` declared a user-facing
    // slider in the settings dialog with an onChange callback that called
    // applyDefaults(). In v2, `ExtensionManager.setting` only exposes get/set
    // — there is no `addSetting`. Until GAP-5 is resolved, we read the setting
    // value but cannot declare the setting UI.
    //
    // Desired v2 code (not yet compilable):
    //   ext.setting.add({
    //     id: 'Comfy.NodeSuggestions.number',
    //     name: 'Number of node suggestions',
    //     type: 'slider',
    //     defaultValue: 5,
    //     attrs: { min: 1, max: 100, step: 1 },
    //     onChange: (v: number) => { maxSuggestions = v; applyDefaults() }
    //   })

    const stored = _ext.setting.get<number>('Comfy.NodeSuggestions.number')
    if (stored !== undefined) maxSuggestions = stored

    // GAP-4: In v1, each node type's data was processed in `beforeRegisterNodeDef`.
    // In v2 there is no equivalent; `processNodeDef` above exists as a named
    // placeholder so Simon/Austin can see exactly what shape the hook needs.
    // The actual invocation loop over all registered node types would go here
    // once `onNodeTypeRegistered(def)` or an equivalent is added to the API.
    void processNodeDef // referenced to avoid dead-code lint warning
  }
})
