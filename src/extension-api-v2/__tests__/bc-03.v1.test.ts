// Category: BC.03 — Node lifecycle: hydration from saved workflows
// DB cross-ref: S1.H1, S2.N7
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/
// Surface: S1.H1 = beforeRegisterNodeDef (used for hydration guards), S2.N7 = node.onConfigure
// compat-floor: blast_radius 4.91 ≥ 2.0 — MUST pass before v2 ships
// v1 contract: S1.H1 = beforeRegisterNodeDef guard; S2.N7 = node.onConfigure = function(data) { ... }
// Note: loadedGraphNode hook exists in LiteGraph but is effectively unused in ComfyUI —
//       onConfigure is the de-facto hydration surface.

import { describe, it } from 'vitest'

describe('BC.03 v1 contract — node lifecycle: hydration from saved workflows', () => {
  describe('S2.N7 — node.onConfigure', () => {
    it.todo(
      'onConfigure is called when a saved workflow is loaded and the node is rehydrated from serialized data'
    )
    it.todo(
      'onConfigure receives the raw serialized node object (data) as its first argument'
    )
    it.todo(
      'onConfigure is NOT called on freshly created nodes (only on deserialization)'
    )
    it.todo(
      'widget values written to data inside a prior session are accessible via data.widgets_values in onConfigure'
    )
    it.todo(
      'extensions can restore custom properties stored in data.properties inside onConfigure'
    )
  })

  describe('S1.H1 — beforeRegisterNodeDef hydration guard', () => {
    it.todo(
      'beforeRegisterNodeDef can inject a custom onConfigure override on the node prototype before any instance is created'
    )
    it.todo(
      'prototype-level onConfigure injected in beforeRegisterNodeDef is invoked for all instances during workflow load'
    )
  })
})
