// Category: BC.22 — Context menu contributions (node and canvas)
// DB cross-ref: S2.N5, S1.H3, S1.H4
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/
// blast_radius: 5.10
// compat-floor: blast_radius ≥ 2.0
// v2 replacement: NodeHandle.addContextMenuItem(opts), app.addCanvasMenuItem(opts)
//                 registered items removed on extension dispose

import { describe, it } from 'vitest'

describe('BC.22 v2 contract — Context menu contributions (node and canvas)', () => {
  describe('NodeHandle.addContextMenuItem() — node-scoped menu items', () => {
    it.todo(
      'NodeHandle.addContextMenuItem({ label, action }) appends the item to that node\'s right-click menu'
    )
    it.todo(
      'action callback receives a MenuItemContext with the target NodeHandle'
    )
    it.todo(
      'addContextMenuItem returns a disposable; calling it removes only that item'
    )
    it.todo(
      'item added via addContextMenuItem is removed automatically when the extension scope is disposed'
    )
  })

  describe('app.addCanvasMenuItem() — canvas-scoped menu items', () => {
    it.todo(
      'app.addCanvasMenuItem({ label, action }) appends the item to the canvas right-click menu'
    )
    it.todo(
      'canvas menu item is visible only when right-clicking empty canvas (no node hit)'
    )
    it.todo(
      'canvas menu item is removed when the extension scope is disposed'
    )
  })
})
