// Category: BC.26 — Globals as ABI (window.LiteGraph, window.comfyAPI)
// DB cross-ref: S7.G1
// Exemplar: https://github.com/ryanontheinside/ComfyUI_RyanOnTheInside/blob/main/web/js/index.js#L1
// blast_radius: 4.55
// compat-floor: blast_radius ≥ 2.0
// v2 replacement: explicit imports from @comfyorg/extension-api
//                 globals still exported for compat shim but deprecated

import { describe, it } from 'vitest'

describe('BC.26 v2 contract — Globals as ABI (window.LiteGraph, window.comfyAPI)', () => {
  describe('explicit LiteGraph imports from @comfyorg/extension-api', () => {
    it.todo(
      'LGraph, LGraphNode, LLink are importable by name from @comfyorg/extension-api'
    )
    it.todo(
      'LiteGraph enum constants (INPUT, OUTPUT, etc.) are importable as named exports'
    )
    it.todo(
      'imported constructors are the same references as window.LiteGraph equivalents during the compat shim window'
    )
  })

  describe('explicit comfyApp / service imports', () => {
    it.todo(
      'comfyApp is importable from @comfyorg/extension-api and is the same instance as window.app'
    )
    it.todo(
      'extensionManager is importable from @comfyorg/extension-api and is the same instance as window.comfyAPI.modules.extensionService'
    )
  })

  describe('compat shim deprecation', () => {
    it.todo(
      'accessing window.LiteGraph in v2 mode emits a deprecation warning to the console'
    )
    it.todo(
      'accessing window.comfyAPI in v2 mode emits a deprecation warning to the console'
    )
    it.todo(
      'compat shim globals are still functional (not removed) so v1 extensions continue working during migration window'
    )
  })
})
