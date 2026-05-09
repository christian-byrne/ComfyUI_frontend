# Names That Must Agree Across Layers

**Task:** DOC1.E6  
**Date:** 2026-05-08  
**Patterns cross-walked:** S2.N16 (widget array access), S13.SC1 (ComfyNodeDef inspection), S15.OS1 (dynamic output mutation)

This appendix enumerates the terms that span at least two of the four layers — Python backend, v1 frontend (`ComfyExtension`/LiteGraph), v2 extension API (`NodeHandle`/`WidgetHandle`), and ECS World components — and calls out real inconsistencies where the same concept is named differently or the semantics diverge. Future contributors who rename or refactor any of these terms must propagate the change across all layers listed.

---

## Layers

| Layer | Owner | Primary source |
|-------|-------|---------------|
| **Python backend** | ComfyUI server | `NODE_CLASS_MAPPINGS`, `INPUT_TYPES`, `RETURN_TYPES` |
| **v1 frontend** | LiteGraph / ComfyExtension | `src/types/comfy.ts`, `src/schemas/nodeDefSchema.ts`, `LGraphNode.ts` |
| **v2 extension API** | This project | `src/extension-api/node.ts`, `src/extension-api/widget.ts` |
| **ECS World** | Alex's branch (PR #11939) | `src/services/extension-api-service.ts` (stubs), `@/world/entityIds` |

---

## Term 1 — Node class identifier (`class_type` / `type` / `comfyClass`)

**What it is:** The string that identifies which Python class backs a node. Used to look up `object_info`, serialize the prompt, and match `INPUT_TYPES` definitions.

| Layer | Name | Value example | Notes |
|-------|------|--------------|-------|
| Python backend | Python class name | `'KSampler'` | The class registered in `NODE_CLASS_MAPPINGS` |
| Execution prompt JSON (API format) | `class_type` | `"class_type": "KSampler"` | Key in the flat prompt dict |
| UWF backend spec | `class_type` | `"class_type": "KSampler"` | Unchanged from API format (per `uwf-backend-data-model.md`) |
| `ComfyNodeDef` (v1 schema) | `name` | `nodeData.name === 'KSampler'` | The `name` field in the server's `/object_info` response |
| `LGraphNode` (v1) | `node.type` | `node.type === 'KSampler'` | LiteGraph's class string; set at registration |
| v2 `NodeHandle` | `handle.type` | `handle.type === 'KSampler'` | `readonly type: string` in `src/extension-api/node.ts:260` |
| v2 `NodeHandle` | `handle.comfyClass` | `handle.comfyClass === 'KSampler'` | `readonly comfyClass: string` in `src/extension-api/node.ts:269` |
| ECS `NodeTypeData` component | `type` + `comfyClass` | both fields | Stub in `extension-api-service.ts:61–63` |

**⚠ Inconsistency — `type` vs `comfyClass`:** v2 `NodeHandle` exposes **both** `type` and `comfyClass` because for most nodes they are equal, but for virtual/reroute nodes `type` is the LiteGraph registration string while `comfyClass` is the actual Python class backing the node. Extensions that compare against ComfyUI node names should always use `comfyClass`. Extensions that filter by LiteGraph registration (for `nodeTypes:` filter in `defineNodeExtension`) should use `type`. The distinction must be preserved — collapsing them back to one field would break reroute/virtual-node detection.

**Rule:** `class_type` (wire format, Python, UWF) = `comfyClass` (v2 API) = `name` in `ComfyNodeDef` = `node.type` in LiteGraph for non-virtual nodes.

---

## Term 2 — Node display name (`display_name` / `title`)

**What it is:** The human-readable label shown in the node header and search results. Distinct from the class identifier.

| Layer | Name | Notes |
|-------|------|-------|
| Python backend | `NODE_DISPLAY_NAME_MAPPINGS[class]` (optional) | If absent, falls back to the class name |
| `ComfyNodeDef` (v1 schema) | `display_name` | `nodeData.display_name` — always a string per zod schema (`src/schemas/nodeDefSchema.ts:279`) |
| `LGraphNode` (v1) | `node.title` | Set during `nodeCreated`; extensions mutate `node.title` directly to rename nodes |
| v2 `NodeHandle` | `handle.title` (getter) + `handle.setTitle(s)` | `src/extension-api/node.ts:304–315`; accessor pair per D3.3/D6 hybrid rule |
| ECS `NodeVisualData` component | `title` | Field name consistent with LiteGraph |

**No inconsistency.** `display_name` lives only in the schema/backend layer; `title` is the runtime/frontend term. The two layers don't overlap. Extension authors should use `handle.setTitle()` in v2; `node.title =` is the v1 equivalent. Both are stable.

---

## Term 3 — Widget name (`name` / `input_name` / `widget.name`)

**What it is:** The stable per-node-instance identifier for a widget slot. Used as the key in `widgets_values_named`, `promoted_inputs`, and for `WidgetHandle` lookup.

| Layer | Name | Notes |
|-------|------|-------|
| Python backend `INPUT_TYPES` | Dict key (e.g. `'seed'`, `'steps'`) | The name as declared in the Python class |
| UWF `promoted_inputs` | `input_name` | `{ node_id, input_name, display_name }` — snake_case to match Python origin |
| UWF `spec.nodes.{id}.inputs` | Named key in the inputs object | e.g. `"seed": { "value": 123, "link": null }` |
| v1 `LGraphNode.widgets` | `widget.name` | `widget.name === 'seed'` — used in `node.widgets.find(w => w.name === ...)` (S2.N16 pattern) |
| v1 `node.widgets` iteration | position index (implicit) | `widgets_values` positional array — the root cause of widget shift bugs (S17.WV1) |
| v2 `NodeHandle.widget(name)` | `name` argument | Lookup by name, not position (`src/extension-api/node.ts:383`) |
| v2 `NodeHandle.addWidget(type, name, ...)` | `name` parameter | `src/extension-api/node.ts:396–403`; stable key for the widget's lifetime |
| v2 `WidgetHandle.name` | `readonly name: string` | `src/extension-api/widget.ts:277` — "stable within the node's lifetime" |
| ECS `WidgetComponentSchema` | `name` field (inferred) | Widget schema component expected to carry `name` per `widgetComponents` import |

**⚠ Inconsistency — positional array vs. named:** v1 serialization stores widget values as a positional array (`widgets_values: [123, 20, 7.5]`). v2 API and UWF both use `name` as the stable key. The bridge is Austin's PR #10392 (`widgets_values_named`). Until that merges, any code that reads `node.widgets[i]` by index is fragile; code that reads `widget.name` is UWF-safe. The v2 `WidgetHandle` **must** be looked up by name, never by index — this is enforced by the API shape.

**Rule:** Always use the Python-declared input name as the canonical widget identifier. Never use position. `widget.name` (v1) = `name` parameter (v2 addWidget) = `input_name` (UWF wire format).

---

## Term 4 — Widget type string (`type` / `widgetType` / widget constructor key)

**What it is:** The string describing what kind of widget a slot is (e.g. `'INT'`, `'STRING'`, `'COMBO'`, `'IMAGE'`). Controls which widget constructor is used and which validation rules apply.

| Layer | Name | Notes |
|-------|------|-------|
| Python backend | Return value of `INPUT_TYPES()` tuple: first element | e.g. `("INT", {"default": 42})` — the type string |
| `ComfyNodeDef` / `InputSpec` | Type string as zod-inferred from the schema | `INPUT_TYPES['required']['steps'] = ['INT', {...}]` |
| `zBaseInputOptions` | `widgetType` field (optional override) | `src/schemas/nodeDefSchema.ts:33` — overrides the slot type for widget selection; rare |
| v1 `getCustomWidgets` return | Record key | `{ MY_WIDGET: constructor }` — extension-registered type strings |
| v1 `node.addWidget(type, ...)` | `type` first arg | The LiteGraph widget constructor key |
| v2 `NodeHandle.addWidget(type, name, ...)` | `type` first arg | `src/extension-api/node.ts:395, 403` |
| v2 `WidgetHandle.type` | `readonly type: string` | `src/extension-api/widget.ts` line ~280 |
| ECS `WidgetComponentSchema` | `type` field | Expected to match the Python-declared type string |

**⚠ Inconsistency — `widgetType` override:** The `widgetType` field in `zBaseInputOptions` is an override that makes the frontend render a different widget than the Python type implies. Extensions that inspect `nodeData.input.required[name][1].widgetType` to determine rendering (S13.SC1 pattern) must check this field **before** using the slot's primary type. The v2 `ComfyNodeDef`-inspection helper (`ctx.inspectNodeDef`) must resolve this correctly — it cannot just return `InputSpec[0]` (the Python type) as `widgetType`.

**Rule:** Python type string = v1 `widget.type` = v2 `WidgetHandle.type` = `widgetType` override if present (takes precedence).

---

## Term 5 — Slot type string (connection type / `'IMAGE'`, `'LATENT'`, etc.)

**What it is:** The type label on a node's input/output slot that governs which connections are valid. Distinct from widget type (a slot may be a pure connection point with no widget).

| Layer | Name | Notes |
|-------|------|-------|
| Python backend | `RETURN_TYPES` tuple element | e.g. `RETURN_TYPES = ('IMAGE', 'MASK')` |
| Python backend `INPUT_TYPES` | First element of required/optional tuple | `'IMAGE'` means "must receive an IMAGE connection" |
| UWF `spec.nodes.{id}.outputs` | `{ "name": "IMAGE" }` per output | Output type declarations (new in UWF — not in old API format) |
| v1 `LGraphNode` slot | `slot.type` | String on the slot object; extensions read/mutate via S15.OS1 |
| v1 `node.addInput(name, type)` | `type` second arg | e.g. `node.addInput('mask', 'MASK')` |
| v1 `node.addOutput(name, type)` | `type` second arg | S15.OS1 pattern |
| v2 `SlotInfo` | `readonly type: string` | `src/extension-api/node.ts:82–83` |
| v2 slot events | `event.slot.type` | Available in `onSlotConnected`, `onSlotDisconnected` |

**⚠ Inconsistency — dynamic mutation (S15.OS1):** v1 allows `slot.type = 'IMAGE'` and `node.outputs[i].type = newType` at runtime. v2 restricts this: output types must be declared in `INPUT_TYPES` / schema; runtime mutation is only via `node.declareOutputs(spec)` (proposed, not yet implemented). This is an intentional breaking change. The UWF spec formalizes this by requiring `spec.nodes.{id}.outputs` to be declared at save time, not derived from runtime state.

**Rule:** Slot type strings are uppercase by convention (matching Python `RETURN_TYPES`). v2 enforces schema-declaration; mutation-at-runtime is deprecated.

---

## Term 6 — Node output name (`output_name` / `RETURN_NAMES`)

**What it is:** Optional human-readable names for a node's output slots. Not the type — the label shown on the output connector.

| Layer | Name | Notes |
|-------|------|-------|
| Python backend | `RETURN_NAMES` class attribute | e.g. `RETURN_NAMES = ('upscaled_image', 'mask')` — optional |
| `ComfyNodeDef` schema | `output_name` | `z.array(z.string()).optional()` in `src/schemas/nodeDefSchema.ts:275` |
| v1 `LGraphNode` | `output.name` | String on the slot object; `node.outputs[i].name` |
| v2 `SlotInfo` | `readonly name: string` | `src/extension-api/node.ts:80–81` — same field name |

**No inconsistency.** `RETURN_NAMES` → `output_name` in the schema → `slot.name` at runtime. All three refer to the same string. Field name shifts from snake_case (`output_name`) in the schema to camelCase-neutral (`name`) on the slot object — consistent with the rest of the frontend.

---

## Term 7 — Extension name (`ComfyExtension.name` / `ExtensionOptions.name`)

**What it is:** The unique identifier for an extension used for hook ordering (D10b), scope registry keys, deprecation telemetry, and conflict detection.

| Layer | Name | Notes |
|-------|------|-------|
| v1 `ComfyExtension` | `name: string` | Required field; `src/types/comfy.ts:108`; typically a dotted namespace like `'Comfy.Sidebar'` |
| v2 `ExtensionOptions` | `name: string` | Required field; `src/extension-api/lifecycle.ts`; same semantic |
| ECS scope registry | `extensionName` | Key component of `NodeInstanceScope`; used in `${extensionName}:${nodeEntityId}` scope key |
| D6 telemetry | `apiVersion` | Separate field added by I-EXT.3 to `ExtensionOptions` for version tracking — not a replacement for `name` |

**No inconsistency.** Same field name and semantics across v1 and v2. The scope registry key format is `${extensionName}:${nodeEntityId}` — both components must be stable.

**Rule:** Extension names should follow the dotted-namespace convention (e.g. `'MyPublisher.MyExtension'`) to avoid collisions. This is currently advisory, not enforced.

---

## Term 8 — Node input display name (`display_name` / widget label)

**What it is:** The label shown next to the widget in the UI. Distinct from the internal `name` (key) used for serialization.

| Layer | Name | Notes |
|-------|------|-------|
| Python backend | `display_name` in input options dict | `INPUT_TYPES()['required']['steps'] = ['INT', {'display_name': 'Steps'}]` |
| `zBaseInputOptions` schema | `display_name: z.string().optional()` | `src/schemas/nodeDefSchema.ts:27` |
| UWF `promoted_inputs` | `display_name` field | `{ node_id, input_name, display_name }` — the UI label for app-mode promoted inputs |
| v1 `widget` | `widget.label` | Optional; falls back to `widget.name` if absent. Inspected in S2.N16 patterns |
| v2 `WidgetHandle` | `label` getter | `src/extension-api/widget.ts:355` — "Defaults to the widget name" |

**No inconsistency** in naming — all layers call it `display_name` (schema/wire) or `label` (runtime). The two forms are consistent: `display_name` is the static schema-declared label; `label` is the runtime-settable display string. v2 exposes `label` as a settable accessor; the Python-declared `display_name` becomes its initial value.

---

## Summary: real inconsistencies to track

| # | Inconsistency | Risk | Resolution |
|---|--------------|------|-----------|
| 1 | `type` vs `comfyClass` on `NodeHandle` — two fields, must not collapse | Medium | Document: use `comfyClass` for Python identity, `type` for LiteGraph registration. Enforced by distinct fields. |
| 2 | Widget identity: positional index (v1 `widgets_values`) vs name key (v2 / UWF) | **HIGH** | Bridge: Austin's PR #10392 (`widgets_values_named`). v2 `WidgetHandle` is name-only. Never look up by position in v2 code. |
| 3 | `widgetType` override in `InputSpec` takes precedence over slot type for rendering | Medium | `ctx.inspectNodeDef` must resolve `widgetType` before returning slot type. Do not skip this field. |
| 4 | Slot type mutation (S15.OS1): `slot.type = X` is valid v1, banned in v2/UWF | Medium | v2 must not expose a `setType()` mutator on `SlotInfo`. Schema-declare outputs; UWF enforces at save time. |

---

## Cross-references

- **S2.N16** — widget array iteration/mutation (`node.widgets[i]`, `node.widgets.find(w => w.name === ...)`): the `name` field is the stable key; position is not. v2 forces name-based lookup.
- **S13.SC1** — `ComfyNodeDef` inspection: callers must resolve `widgetType` override (Term 4) and understand `display_name` vs runtime `label` (Term 8). The `ctx.inspectNodeDef` typed helper (D4 G1 BLOCKER) wraps this correctly.
- **S15.OS1** — dynamic output mutation: slot `type` strings are the agreed layer (Term 5), but v1 allows mutation that v2/UWF forbids. Track in I-PG.B2 as `strangler-bridge` until UWF Phase 3 covers output schema declaration.
- **UWF backend data model** — `class_type`, `input_name`, `display_name` snake_case keys mirror Python origin. v2 API uses camelCase (`comfyClass`, widget `name`, widget `label`) per JS convention. No semantic difference; only case convention changes at the API boundary.
