// Category: BC.16 — Execution output consumption (per-node)
// DB cross-ref: S2.N2
// Exemplar: https://github.com/andreszs/ComfyUI-Ultralytics-Studio/blob/main/js/show_string.js#L9
// blast_radius: 4.67 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// v1 contract: node.onExecuted = function(data) { /* data.text, data.images etc */ }

import { describe, it } from 'vitest'

describe('BC.16 v1 contract — node.onExecuted callback', () => {
  describe('S2.N2 — per-node execution output', () => {
    it.todo(
      'node.onExecuted is called by the runtime when the backend reports output for that node\'s ID'
    )
    it.todo(
      'data.text is an array of strings when the node outputs text-type results'
    )
    it.todo(
      'data.images is an array of image descriptor objects when the node outputs image-type results'
    )
    it.todo(
      'data passed to onExecuted matches the raw output object from the backend executed event for that node'
    )
    it.todo(
      'assigning node.onExecuted after graph load is sufficient; the handler receives subsequent execution outputs'
    )
    it.todo(
      'onExecuted is not called for nodes whose IDs are absent from the execution output'
    )
  })
})
