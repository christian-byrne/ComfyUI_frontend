// Category: BC.22 — Context menu contributions (node and canvas)
// DB cross-ref: S2.N5, S1.H3, S1.H4
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/
// blast_radius: 5.10
// compat-floor: blast_radius ≥ 2.0
// Migration: v1 getNodeMenuItems / prototype.getExtraMenuOptions / getCanvasMenuItems
//         → v2 NodeHandle.addContextMenuItem / app.addCanvasMenuItem

import { describe, it } from 'vitest'

describe('BC.22 migration — Context menu contributions (node and canvas)', () => {
  describe('node menu item parity (S1.H3 → NodeHandle.addContextMenuItem)', () => {
    it.todo(
      'v1 getNodeMenuItems item and v2 addContextMenuItem item both appear in the node context menu with equal label text'
    )
    it.todo(
      'action/callback invoked by clicking the item receives equivalent node context in both v1 and v2'
    )
  })

  describe('prototype patch migration (S2.N5 → NodeHandle.addContextMenuItem)', () => {
    it.todo(
      'v1 prototype.getExtraMenuOptions items and v2 addContextMenuItem items both render in the same menu section'
    )
    it.todo(
      'migrating from prototype patch removes the need to manually chain prior implementations'
    )
  })

  describe('canvas menu parity (S1.H4 → app.addCanvasMenuItem)', () => {
    it.todo(
      'v1 getCanvasMenuItems item and v2 addCanvasMenuItem item both appear when right-clicking empty canvas'
    )
  })

  describe('scope cleanup on dispose', () => {
    it.todo(
      'v1 menu items persist after extension unregisters; v2 items are removed on dispose'
    )
    it.todo(
      'v2 item removal on dispose does not affect items contributed by other extensions'
    )
  })
})
