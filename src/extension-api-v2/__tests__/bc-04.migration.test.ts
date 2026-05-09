// Category: BC.04 — Node interaction: pointer, selection, resize
// DB cross-ref: S2.N10, S2.N17, S2.N19
// Exemplar: https://github.com/diodiogod/TTS-Audio-Suite/blob/main/web/chatterbox_voice_capture.js#L202
// compat-floor: blast_radius 4.95 ≥ 2.0 — MUST pass before v2 ships
// Migration: v1 node.onMouseDown/onSelected/onResize → v2 handle.on('mousedown'|'selected'|'resize', ...)

import { describe, it } from 'vitest'

describe('BC.04 migration — node interaction: pointer, selection, resize', () => {
  describe('mousedown parity (S2.N10)', () => {
    it.todo(
      'v1 node.onMouseDown and v2 handle.on("mousedown") are both invoked for the same pointer-down events'
    )
    it.todo(
      'propagation-stop by returning true in v1 is equivalent to event.stopPropagation() in v2 handler'
    )
    it.todo(
      'local coordinates passed to v1 onMouseDown match the x/y in the v2 event object for the same input'
    )
  })

  describe('selection parity (S2.N17)', () => {
    it.todo(
      'v1 node.onSelected and v2 handle.on("selected") are both invoked when the node is selected'
    )
    it.todo(
      'v2 introduces an explicit deselected event absent in v1; migration must add deselected handler for cleanup that relied on onSelected re-fire'
    )
  })

  describe('resize parity (S2.N19)', () => {
    it.todo(
      'v1 node.onResize([w,h]) and v2 handle.on("resize", { width, height }) convey the same dimensions for the same resize action'
    )
    it.todo(
      'computeSize overrides that triggered onResize in v1 still trigger the resize event in v2'
    )
  })

  describe('listener lifetime', () => {
    it.todo(
      'v1 listeners on removed nodes remain registered (leak); v2 handle.on() listeners are auto-removed on node removal'
    )
  })
})
