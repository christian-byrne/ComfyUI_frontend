// Category: BC.05 — Custom DOM widgets and node sizing
// DB cross-ref: S4.W2, S2.N11
// Exemplar: https://github.com/Lightricks/ComfyUI-LTXVideo/blob/main/web/js/sparse_track_editor.js#L218
// Surface: S4.W2 = node.addDOMWidget, S2.N11 = node.computeSize override
// compat-floor: blast_radius 5.45 ≥ 2.0 — MUST pass before v2 ships
// v1 contract: node.addDOMWidget(name, type, element, opts) + node.computeSize = function(out) { ... }

import { describe, it } from 'vitest'

describe('BC.05 v1 contract — custom DOM widgets and node sizing', () => {
  describe('S4.W2 — node.addDOMWidget', () => {
    it.todo(
      'addDOMWidget(name, type, element, opts) appends the provided DOM element inside the node widget area'
    )
    it.todo(
      'widget registered via addDOMWidget is accessible via node.widgets array by the given name'
    )
    it.todo(
      'addDOMWidget opts.getHeight() is called during layout to determine the widget reserved height'
    )
    it.todo(
      'addDOMWidget opts.onDraw(ctx) callback is invoked during each canvas render pass'
    )
    it.todo(
      'the DOM element is removed from the document when the node is removed via graph.remove()'
    )
  })

  describe('S2.N11 — node.computeSize override', () => {
    it.todo(
      'assigning node.computeSize = function(out) { ... } overrides the default size calculation for the node'
    )
    it.todo(
      'overridden computeSize is called by LiteGraph layout engine before rendering'
    )
    it.todo(
      'computeSize can return a [width, height] pair that accounts for the DOM widget reserved height'
    )
    it.todo(
      'computeSize override persists across graph load/reload if set in nodeCreated or beforeRegisterNodeDef'
    )
  })
})
