// Category: BC.16 — Execution output consumption (per-node)
// DB cross-ref: S2.N2
// Exemplar: https://github.com/andreszs/ComfyUI-Ultralytics-Studio/blob/main/js/show_string.js#L9
// blast_radius: 4.67 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// v2 replacement: NodeHandle.on('executed', (data) => { ... })

import { describe, it } from 'vitest'

describe('BC.16 v2 contract — NodeHandle executed event', () => {
  describe('event subscription', () => {
    it.todo(
      'nodeHandle.on("executed", handler) registers a handler that fires when backend output arrives for that node'
    )
    it.todo(
      'handler receives a typed data object with text, images, and any other output slots defined by the node\'s schema'
    )
    it.todo(
      'nodeHandle.on("executed", ...) returns an unsubscribe function; calling it stops future invocations'
    )
  })

  describe('data shape and typing', () => {
    it.todo(
      'data.text is typed as string[] for text-output nodes; accessing it does not require a cast'
    )
    it.todo(
      'data.images is typed as ImageOutput[] for image-output nodes, including filename, subfolder, and type fields'
    )
  })

  describe('handler lifecycle', () => {
    it.todo(
      'handlers registered via nodeHandle.on("executed") are automatically removed when the node is removed from the graph'
    )
    it.todo(
      'multiple handlers on the same node each fire independently and in registration order'
    )
  })
})
