// Category: BC.26 — Globals as ABI (window.LiteGraph, window.comfyAPI)
// DB cross-ref: S7.G1
// Exemplar: https://github.com/ryanontheinside/ComfyUI_RyanOnTheInside/blob/main/web/js/index.js#L1
// blast_radius: 4.55
// compat-floor: blast_radius ≥ 2.0
// Migration: v1 window.LiteGraph / window.comfyAPI / window.app access
//         → v2 explicit named imports from @comfyorg/extension-api

import { describe, it } from 'vitest'

describe('BC.26 migration — Globals as ABI (window.LiteGraph, window.comfyAPI)', () => {
  describe('LiteGraph reference parity (S7.G1)', () => {
    it.todo(
      'window.LiteGraph.LGraphNode and the named import LGraphNode from @comfyorg/extension-api are the same constructor reference'
    )
    it.todo(
      'a node registered via window.LiteGraph.registerNodeType is identical to one registered via the v2 import path'
    )
    it.todo(
      'LiteGraph enum values accessed via window and via import are strictly equal (===)'
    )
  })

  describe('comfyAPI / comfyApp reference parity', () => {
    it.todo(
      'window.app and the imported comfyApp share the same graph state — mutations via one are visible on the other'
    )
    it.todo(
      'window.comfyAPI.modules.extensionService and imported extensionManager refer to the same instance'
    )
  })

  describe('deprecation signal migration', () => {
    it.todo(
      'replacing window.LiteGraph access with named imports removes all deprecation console warnings'
    )
    it.todo(
      'replacing window.comfyAPI access with named imports removes all deprecation console warnings'
    )
  })
})
