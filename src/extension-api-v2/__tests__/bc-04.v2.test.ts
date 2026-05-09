// Category: BC.04 — Node interaction: pointer, selection, resize
// DB cross-ref: S2.N10, S2.N17, S2.N19
// Exemplar: https://github.com/diodiogod/TTS-Audio-Suite/blob/main/web/chatterbox_voice_capture.js#L202
// compat-floor: blast_radius 4.95 ≥ 2.0 — MUST pass before v2 ships
// v2 replacement: defineNodeExtension({ on('mousedown', ...), on('selected', ...), on('resize', ...) })

import { describe, it } from 'vitest'

describe('BC.04 v2 contract — node interaction: pointer, selection, resize', () => {
  describe('on(\"mousedown\", handler) — pointer events (S2.N10)', () => {
    it.todo(
      'handle.on("mousedown", handler) registers a listener called when pointer-down occurs within the node bounding box'
    )
    it.todo(
      'handler receives an event object with local x/y coordinates relative to the node origin'
    )
    it.todo(
      'handler returning true stops propagation to LiteGraph default mouse handling'
    )
    it.todo(
      'listener registered via handle.on() is automatically removed when the node is removed from the graph'
    )
  })

  describe('on(\"selected\", handler) — selection focus (S2.N17)', () => {
    it.todo(
      'handle.on("selected", handler) is called when the node enters selected state'
    )
    it.todo(
      'handle.on("deselected", handler) is called when the node exits selected state'
    )
    it.todo(
      'selected and deselected events do not fire during programmatic selection with { silent: true } option'
    )
  })

  describe('on(\"resize\", handler) — resize feedback (S2.N19)', () => {
    it.todo(
      'handle.on("resize", handler) is called after the node dimensions change'
    )
    it.todo(
      'handler receives a { width, height } object matching the new node size'
    )
    it.todo(
      'resize event fires for both user drag-resize and programmatic NodeHandle.setSize() calls'
    )
  })
})
