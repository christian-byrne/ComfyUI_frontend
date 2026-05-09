// Category: BC.20 — Custom node-type registration (frontend-only / virtual)
// DB cross-ref: S1.H5, S1.H6, S8.P1
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/rerouteNode.ts
// blast_radius: 5.49 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// v1 contract: app.registerExtension({ registerCustomNodes(app) { LiteGraph.registerNodeType('MyType', MyClass); MyClass.prototype.isVirtualNode = true } })
//              app.registerExtension({ beforeRegisterNodeDef(nodeType, nodeData) { ... } })

import { describe, it } from 'vitest'

describe('BC.20 v1 contract — LiteGraph.registerNodeType and isVirtualNode', () => {
  describe('S1.H5 — registerCustomNodes hook', () => {
    it.todo(
      'registerExtension({ registerCustomNodes(app) }) is called during setup before any graph is loaded'
    )
    it.todo(
      'LiteGraph.registerNodeType("MyType", MyClass) inside registerCustomNodes makes the type instantiable in the graph'
    )
    it.todo(
      'setting MyClass.prototype.isVirtualNode = true causes the serializer to omit the node from the backend API payload'
    )
    it.todo(
      'virtual node is still visible and interactive in the LiteGraph canvas'
    )
  })

  describe('S1.H6 — beforeRegisterNodeDef hook', () => {
    it.todo(
      'registerExtension({ beforeRegisterNodeDef(nodeType, nodeData) }) fires for every backend-defined node type before it is registered'
    )
    it.todo(
      'extension can augment nodeType prototype inside beforeRegisterNodeDef and the change affects all future instances'
    )
    it.todo(
      'mutations to nodeData inside beforeRegisterNodeDef alter the node\'s widget/input schema visible to the graph'
    )
  })

  describe('S8.P1 — virtual node payload suppression', () => {
    it.todo(
      'graphToPrompt excludes nodes with isVirtualNode === true from the output object sent to the backend'
    )
    it.todo(
      'links connected to a virtual node are re-routed in the serialized output to preserve logical connectivity'
    )
  })
})
