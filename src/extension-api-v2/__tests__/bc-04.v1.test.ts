// Category: BC.04 — Node interaction: pointer, selection, resize
// DB cross-ref: S2.N10, S2.N17, S2.N19
// Exemplar: https://github.com/diodiogod/TTS-Audio-Suite/blob/main/web/chatterbox_voice_capture.js#L202
// Surface: S2.N10 = node.onMouseDown, S2.N17 = node.onSelected, S2.N19 = node.onResize
// compat-floor: blast_radius 4.95 ≥ 2.0 — MUST pass before v2 ships
// v1 contract: node.onMouseDown, node.onSelected, node.onResize prototype method assignments

import { describe, it } from 'vitest'

describe('BC.04 v1 contract — node interaction: pointer, selection, resize', () => {
  describe('S2.N10 — node.onMouseDown', () => {
    it.todo(
      'onMouseDown is called when a pointer-down event occurs within the node bounding box on the canvas'
    )
    it.todo(
      'onMouseDown receives the MouseEvent and the local [x, y] position within the node as arguments'
    )
    it.todo(
      'returning true from onMouseDown stops propagation to LiteGraph default mouse handling'
    )
    it.todo(
      'onMouseDown is NOT called when the pointer down is outside the node bounding box'
    )
  })

  describe('S2.N17 — node.onSelected', () => {
    it.todo(
      'onSelected is called when the node transitions to selected state (single-click or box-select)'
    )
    it.todo(
      'onSelected is called once per selection event even if the node was already selected'
    )
    it.todo(
      'onSelected is not called when a different node is selected and this node is deselected'
    )
  })

  describe('S2.N19 — node.onResize', () => {
    it.todo(
      'onResize is called after the node dimensions change (user drag-resize or programmatic setSize)'
    )
    it.todo(
      'onResize receives the new [width, height] array as its argument'
    )
    it.todo(
      'onResize is called after the node size is committed, not during the drag'
    )
  })
})
