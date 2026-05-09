// Category: BC.01 — Node lifecycle: creation
// DB cross-ref: S2.N1, S2.N8
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/saveImageExtraOutput.ts#L31
// compat-floor: blast_radius 4.48 ≥ 2.0 — MUST pass before v2 ships
// v2 replacement: defineNodeExtension({ nodeCreated(handle) { ... } })
// Note: v2 nodeCreated receives a NodeHandle, not a raw LGraphNode. VueNode mount
//       timing guarantee is unchanged — defer to onNodeMounted for Vue-backed state.

import { describe, it } from 'vitest'

describe('BC.01 v2 contract — node lifecycle: creation', () => {
  describe('nodeCreated(handle) — per-instance setup', () => {
    it.todo(
      'nodeCreated is called once per node instance and receives a NodeHandle wrapping the created node'
    )
    it.todo(
      'NodeHandle.id is stable and matches the underlying LGraphNode id at call time'
    )
    it.todo(
      'NodeHandle.type returns the registered node type string'
    )
    it.todo(
      'state stored via NodeHandle.setState() inside nodeCreated is retrievable in subsequent hooks for the same instance'
    )
    it.todo(
      'nodeCreated fires before VueNode mounts; accessing NodeHandle.vueRef inside nodeCreated returns null'
    )
  })

  describe('type-level registration (replacement for S2.N8)', () => {
    it.todo(
      'defineNodeExtension({ types: [\"MyNode\"] }) scopes nodeCreated to only instances of the listed types'
    )
    it.todo(
      'omitting types: causes nodeCreated to fire for every node type (global registration)'
    )
    it.todo(
      'type-scoped registration does not receive nodeCreated calls for unregistered node types'
    )
  })
})
