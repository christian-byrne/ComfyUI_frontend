// Category: BC.20 — Custom node-type registration (frontend-only / virtual)
// DB cross-ref: S1.H5, S1.H6, S8.P1
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/rerouteNode.ts
// blast_radius: 5.49 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// Migration: v1 LiteGraph.registerNodeType + isVirtualNode → v2 defineNodeExtension({ isVirtual: true, setup })

import { describe, it } from 'vitest'

describe('BC.20 migration — custom and virtual node registration', () => {
  describe('registration equivalence (S1.H5)', () => {
    it.todo(
      'v1 LiteGraph.registerNodeType("MyType", MyClass) and v2 defineNodeExtension({ nodeType: "MyType" }) both make the type droppable from the node picker'
    )
    it.todo(
      'v1 MyClass.prototype.isVirtualNode = true and v2 isVirtual: true both exclude the node from the graphToPrompt output'
    )
    it.todo(
      'canvas rendering behaviour of a virtual node is identical between v1 and v2 registration paths'
    )
  })

  describe('augmentation equivalence (S1.H6)', () => {
    it.todo(
      'v1 beforeRegisterNodeDef prototype mutation and v2 defineNodeExtension setup() widget addition produce equivalent UI on existing backend node types'
    )
    it.todo(
      'widget values set via v2 setup(handle) are serialized identically to those set via v1 prototype augmentation'
    )
  })

  describe('serialization equivalence (S8.P1)', () => {
    it.todo(
      'a graph with virtual nodes serialized via v1 graphToPrompt and the same graph using v2 produce bit-equivalent backend payloads'
    )
    it.todo(
      'link re-routing through virtual nodes produces the same source→target pairs in both v1 and v2 serialized outputs'
    )
  })

  describe('cleanup on unregister', () => {
    it.todo(
      'v1 registered types persist in LiteGraph after extension unregisters; v2 types registered via defineNodeExtension are removed'
    )
  })
})
