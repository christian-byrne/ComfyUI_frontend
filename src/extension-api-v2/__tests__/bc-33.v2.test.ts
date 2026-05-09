// Category: BC.33 — Cross-extension DOM widget creation observation
// DB cross-ref: S4.W6
// Exemplar: https://github.com/goodtab/ComfyUI-Custom-Scripts
// blast_radius: 0.0
// compat-floor: NO (absent API gap — this is a new v2 API surface)
// v2 contract: comfyApp.on('domWidgetCreated', (widgetHandle) => { ... })
//              fires for every DOM widget created by any extension

import { describe, it } from 'vitest'

describe('BC.33 v2 contract — cross-extension DOM widget creation observation', () => {
  describe('S4.W6 — domWidgetCreated event', () => {
    it.todo(
      "comfyApp.on('domWidgetCreated', handler) registers a listener that fires for every DOM widget created"
    )
    it.todo(
      'handler receives a WidgetHandle with type, name, and owning NodeHandle accessible'
    )
    it.todo(
      'domWidgetCreated fires for widgets created by other extensions, not just the registering extension'
    )
    it.todo(
      'listener registered before any node is created receives events for all subsequently created DOM widgets'
    )
  })

  describe('S4.W6 — handler cleanup', () => {
    it.todo(
      "comfyApp.off('domWidgetCreated', handler) unregisters the listener without affecting other listeners"
    )
  })
})
