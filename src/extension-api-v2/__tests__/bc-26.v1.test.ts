// Category: BC.26 — Globals as ABI (window.LiteGraph, window.comfyAPI)
// DB cross-ref: S7.G1
// Exemplar: https://github.com/ryanontheinside/ComfyUI_RyanOnTheInside/blob/main/web/js/index.js#L1
// blast_radius: 4.55
// compat-floor: blast_radius ≥ 2.0
// v1: window.LiteGraph.registerNodeType(...), window.comfyAPI.modules.extensionService, window.app

import { describe, it } from 'vitest'

describe('BC.26 v1 contract — Globals as ABI (window.LiteGraph, window.comfyAPI)', () => {
  describe('S7.G1 — window.LiteGraph global usage', () => {
    it.todo(
      'window.LiteGraph is defined and exposes registerNodeType, LGraph, LGraphNode, and LLink constructors'
    )
    it.todo(
      'window.LiteGraph.registerNodeType(type, ctor) registers a custom node type visible in the Add Node menu'
    )
    it.todo(
      'LiteGraph enum constants (e.g. LiteGraph.INPUT, LiteGraph.OUTPUT) are accessible via window.LiteGraph'
    )
  })

  describe('S7.G1 — window.comfyAPI global registry', () => {
    it.todo(
      'window.comfyAPI is defined after the app boots and exposes a modules sub-object'
    )
    it.todo(
      'window.comfyAPI.modules.extensionService references the active extensionManager instance'
    )
    it.todo(
      'services accessed via window.comfyAPI.modules are the same objects as those available via ES module import'
    )
  })

  describe('S7.G1 — window.app global', () => {
    it.todo(
      'window.app is defined and is the same object as the app instance passed to extension hooks'
    )
    it.todo(
      'mutations made to the graph via window.app are reflected in the live canvas immediately'
    )
  })
})
