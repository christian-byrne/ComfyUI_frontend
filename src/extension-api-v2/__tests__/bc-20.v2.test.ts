// Category: BC.20 — Custom node-type registration (frontend-only / virtual)
// DB cross-ref: S1.H5, S1.H6, S8.P1
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/rerouteNode.ts
// blast_radius: 5.49 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// v2 replacement: defineNodeExtension({ nodeType: 'MyType', isVirtual: true, setup(handle) { ... } })

import { describe, it } from 'vitest'

describe('BC.20 v2 contract — defineNodeExtension', () => {
  describe('S1.H5 — virtual node registration', () => {
    it.todo(
      'defineNodeExtension({ nodeType: "MyType", isVirtual: true, setup }) registers a pure-frontend node type'
    )
    it.todo(
      'nodes registered with isVirtual: true do not appear in the serialized API payload from graphToPrompt'
    )
    it.todo(
      'the virtual node is rendered on the canvas and accepts user interaction normally'
    )
    it.todo(
      'setup(handle) receives a NodeHandle bound to every instance created at graph-load or user-drop time'
    )
  })

  describe('S1.H6 — backend node-def augmentation', () => {
    it.todo(
      'defineNodeExtension({ nodeType: "ExistingBackendType", setup }) fires setup for every instance of a backend-defined type'
    )
    it.todo(
      'extension can add widgets to the handle inside setup() and they appear on all matching nodes'
    )
    it.todo(
      'schema-level augmentation (adding an input slot) declared via defineNodeExtension takes effect before the node is first rendered'
    )
  })

  describe('S8.P1 — serialization of virtual links', () => {
    it.todo(
      'links through a virtual node are transparently resolved in the serialized output so backend sees direct source→target connections'
    )
    it.todo(
      'removing the virtual node from the canvas also removes any dangling link stubs from the serialized payload'
    )
  })
})
