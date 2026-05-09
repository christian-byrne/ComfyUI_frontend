// Category: BC.06 — Custom canvas drawing (per-node and canvas-level)
// DB cross-ref: S2.N9, S3.C1, S3.C2
// Exemplar: https://github.com/kijai/ComfyUI-KJNodes/blob/main/web/js/setgetnodes.js#L1256
// Surface: S2.N9 = node.onDrawForeground, S3.C1 = LGraphCanvas.prototype overrides, S3.C2 = ContextMenu replacement
// compat-floor: blast_radius 5.25 ≥ 2.0 — MUST pass before v2 ships
// v1 contract: node.onDrawForeground(ctx, area), LGraphCanvas.prototype.processContextMenu = ...,
//              LGraphCanvas.prototype.drawNodeShape = ... etc.
// v1_scope_note: Simon Tranter (COM-3668) vetoed canvas drawing overrides as "too hacky/specific".
//                S3.C* patterns tracked for blast-radius / strangler-fig planning only.

import { describe, it } from 'vitest'

describe('BC.06 v1 contract — custom canvas drawing (per-node and canvas-level)', () => {
  describe('S2.N9 — node.onDrawForeground', () => {
    it.todo(
      'onDrawForeground(ctx, visibleArea) is called once per render frame for each visible node'
    )
    it.todo(
      'ctx passed to onDrawForeground is the same CanvasRenderingContext2D used by LiteGraph for the node layer'
    )
    it.todo(
      'drawing operations performed in onDrawForeground appear above the node body and below the selection highlight'
    )
    it.todo(
      'onDrawForeground is NOT called for nodes outside the visible area (culled by LiteGraph)'
    )
    it.todo(
      'canvas transform (scale, translate) is already applied when onDrawForeground fires — coordinates are in graph space'
    )
  })

  describe('S3.C1 — LGraphCanvas.prototype method overrides', () => {
    it.todo(
      'assigning LGraphCanvas.prototype.drawNodeShape replaces the built-in node shape renderer for all nodes'
    )
    it.todo(
      'prototype override affects all canvas instances sharing the same prototype (global side-effect)'
    )
    it.todo(
      'two extensions both overriding the same LGraphCanvas.prototype method result in last-writer-wins behavior'
    )
  })

  describe('S3.C2 — ContextMenu global replacement', () => {
    it.todo(
      'reassigning LGraphCanvas.prototype.processContextMenu replaces the context-menu handler for every right-click on the canvas'
    )
    it.todo(
      'extensions replacing processContextMenu must call the original to preserve built-in menu items'
    )
    it.todo(
      'replacing processContextMenu is the most destructive canvas-level override — absence of original call silently drops all built-in menu entries'
    )
  })
})
