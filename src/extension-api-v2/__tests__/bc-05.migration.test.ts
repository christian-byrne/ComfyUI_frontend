// Category: BC.05 — Custom DOM widgets and node sizing
// DB cross-ref: S4.W2, S2.N11
// Exemplar: https://github.com/Lightricks/ComfyUI-LTXVideo/blob/main/web/js/sparse_track_editor.js#L218
// compat-floor: blast_radius 5.45 ≥ 2.0 — MUST pass before v2 ships
// Migration: v1 node.addDOMWidget + node.computeSize → v2 NodeHandle.addDOMWidget + WidgetHandle.setHeight

import { describe, it } from 'vitest'

describe('BC.05 migration — custom DOM widgets and node sizing', () => {
  describe('widget registration parity (S4.W2)', () => {
    it.todo(
      'v1 node.addDOMWidget and v2 NodeHandle.addDOMWidget both result in the element being visible inside the node widget area'
    )
    it.todo(
      'the widget is accessible by name in both v1 node.widgets and v2 NodeHandle.widgets after registration'
    )
    it.todo(
      'v1 opts.getHeight() returning N produces the same reserved height as v2 addDOMWidget({ height: N })'
    )
  })

  describe('computeSize elimination (S2.N11)', () => {
    it.todo(
      'v1 manual computeSize override is unnecessary in v2; equivalent height reservation is achieved via WidgetHandle.setHeight()'
    )
    it.todo(
      'node rendered with v2 auto-computeSize integration has the same final dimensions as v1 with an equivalent manual computeSize override'
    )
  })

  describe('cleanup parity', () => {
    it.todo(
      'v1 requires manual DOM removal in onRemoved; v2 auto-removes the widget element — both result in the element being absent after node removal'
    )
    it.todo(
      'v2 auto-cleanup does not remove DOM elements that were not registered via addDOMWidget, matching v1 scoping'
    )
  })
})
