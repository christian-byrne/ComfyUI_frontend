// Category: BC.01 — Node lifecycle: creation
// DB cross-ref: S2.N1, S2.N8
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/saveImageExtraOutput.ts#L31
// Surface: S2.N1 = nodeCreated hook, S2.N8 = beforeRegisterNodeDef
// compat-floor: blast_radius 4.48 ≥ 2.0 — MUST pass before v2 ships
// v1 contract: app.registerExtension({ nodeCreated(node) { ... } })
// Note: nodeCreated fires BEFORE the VueNode Vue component mounts; extensions needing
//       VueNode-backed state must defer (see BC.37).

import { describe, it } from 'vitest'

describe('BC.01 v1 contract — node lifecycle: creation', () => {
  describe('S2.N1 — nodeCreated hook', () => {
    it.todo(
      'nodeCreated is called once per node instance immediately after the node is constructed'
    )
    it.todo(
      'nodeCreated receives the LGraphNode instance as its first argument'
    )
    it.todo(
      'nodeCreated fires before the node is added to the graph (graph.nodes does not yet contain the node)'
    )
    it.todo(
      'nodeCreated fires before the VueNode Vue component is mounted (vm.$el is null at call time)'
    )
    it.todo(
      'properties set on node inside nodeCreated are accessible in subsequent lifecycle hooks'
    )
  })

  describe('S2.N8 — beforeRegisterNodeDef hook', () => {
    it.todo(
      'beforeRegisterNodeDef is called once per node type before the type is registered in the node registry'
    )
    it.todo(
      'beforeRegisterNodeDef receives the node constructor and the raw node definition object'
    )
    it.todo(
      'prototype mutations made in beforeRegisterNodeDef affect all subsequently created instances of that type'
    )
    it.todo(
      'beforeRegisterNodeDef is NOT called again on graph reload if the type is already registered'
    )
  })
})
