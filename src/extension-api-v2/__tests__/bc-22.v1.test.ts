// Category: BC.22 — Context menu contributions (node and canvas)
// DB cross-ref: S2.N5, S1.H3, S1.H4
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/
// blast_radius: 5.10
// compat-floor: blast_radius ≥ 2.0
// v1 node: app.registerExtension({ getNodeMenuItems(value, options) { return [{ content: 'My Item', callback: fn }] } })
//          or node.prototype.getExtraMenuOptions = function(...) { return [...] }
// v1 canvas: app.registerExtension({ getCanvasMenuItems() { return [{ content: 'Canvas Option', callback: fn }] } })

import { describe, it } from 'vitest'

describe('BC.22 v1 contract — Context menu contributions (node and canvas)', () => {
  describe('S1.H3 — getNodeMenuItems hook', () => {
    it.todo(
      'extension returning items from getNodeMenuItems appends them to the node right-click menu'
    )
    it.todo(
      'getNodeMenuItems receives (value, options) where options.node is the right-clicked LGraph node'
    )
    it.todo(
      'returning null or undefined from getNodeMenuItems does not break the menu'
    )
    it.todo(
      'multiple extensions contributing node menu items all appear in the same context menu'
    )
  })

  describe('S2.N5 — prototype patch getExtraMenuOptions', () => {
    it.todo(
      'assigning node.prototype.getExtraMenuOptions appends extra items to the node context menu'
    )
    it.todo(
      'prototype-patched getExtraMenuOptions receives (app, options) and its items are merged after built-ins'
    )
    it.todo(
      'multiple prototype patches chain correctly without overwriting each other'
    )
  })

  describe('S1.H4 — getCanvasMenuItems hook', () => {
    it.todo(
      'extension returning items from getCanvasMenuItems appends them to the canvas right-click menu'
    )
    it.todo(
      'getCanvasMenuItems items appear only when no node is right-clicked'
    )
  })
})
