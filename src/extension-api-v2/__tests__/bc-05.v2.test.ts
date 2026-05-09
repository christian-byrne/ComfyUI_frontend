// Category: BC.05 — Custom DOM widgets and node sizing
// DB cross-ref: S4.W2, S2.N11
// Exemplar: https://github.com/Lightricks/ComfyUI-LTXVideo/blob/main/web/js/sparse_track_editor.js#L218
// compat-floor: blast_radius 5.45 ≥ 2.0 — MUST pass before v2 ships
// v2 replacement: NodeHandle.addDOMWidget(opts) — auto-hooks computeSize via WidgetHandle geometry

import { describe, it } from 'vitest'

describe('BC.05 v2 contract — custom DOM widgets and node sizing', () => {
  describe('NodeHandle.addDOMWidget(opts) — widget registration', () => {
    it.todo(
      'NodeHandle.addDOMWidget({ name, element }) appends the element inside the node widget area'
    )
    it.todo(
      'addDOMWidget returns a WidgetHandle that exposes the registered widget for further configuration'
    )
    it.todo(
      'widget registered via addDOMWidget is included in NodeHandle.widgets list under opts.name'
    )
    it.todo(
      'addDOMWidget({ name, element, height }) reserves the specified height without requiring a manual computeSize override'
    )
    it.todo(
      'the DOM element is removed from the document automatically when the node is removed (no manual cleanup)'
    )
  })

  describe('WidgetHandle geometry — auto-computeSize integration (S2.N11)', () => {
    it.todo(
      'WidgetHandle.setHeight(px) updates the reserved height and triggers a node relayout without a manual computeSize call'
    )
    it.todo(
      'when multiple DOM widgets are registered, the total node height accounts for all widget heights'
    )
    it.todo(
      'calling WidgetHandle.setHeight() after initial mount correctly re-lays out the node on next render frame'
    )
  })
})
