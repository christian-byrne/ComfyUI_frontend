// Category: BC.03 — Node lifecycle: hydration from saved workflows
// DB cross-ref: S1.H1, S2.N7
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/
// compat-floor: blast_radius 4.91 ≥ 2.0 — MUST pass before v2 ships
// v2 replacement: defineNodeExtension({ onConfigure(handle, data) { ... } })

import { describe, it } from 'vitest'

describe('BC.03 v2 contract — node lifecycle: hydration from saved workflows', () => {
  describe('onConfigure(handle, data) — workflow hydration hook', () => {
    it.todo(
      'onConfigure is called when a node is rehydrated from a saved workflow and NOT on fresh node creation'
    )
    it.todo(
      'onConfigure receives the NodeHandle as first argument and the raw serialized node object as second argument'
    )
    it.todo(
      'data passed to onConfigure contains widgets_values from the saved workflow'
    )
    it.todo(
      'data passed to onConfigure contains properties from the saved workflow'
    )
    it.todo(
      'state written to NodeHandle inside onConfigure is readable in all subsequent hook calls for that instance'
    )
  })

  describe('ordering and idempotency guarantees', () => {
    it.todo(
      'onConfigure fires after nodeCreated for the same instance during workflow load'
    )
    it.todo(
      'onConfigure is not called a second time if the same node receives a re-configure (idempotent load)'
    )
  })
})
