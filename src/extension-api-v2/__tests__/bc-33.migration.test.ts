// Category: BC.33 — Cross-extension DOM widget creation observation
// DB cross-ref: S4.W6
// Exemplar: https://github.com/goodtab/ComfyUI-Custom-Scripts
// blast_radius: 0.0
// compat-floor: NO (absent API gap — migration is from workaround to new first-class event)
// migration: MutationObserver / polling workaround → comfyApp.on('domWidgetCreated', handler)

import { describe, it } from 'vitest'

describe('BC.33 migration — cross-extension DOM widget creation observation', () => {
  describe('MutationObserver workaround replacement', () => {
    it.todo(
      "MutationObserver on document.body for widget detection is replaced by comfyApp.on('domWidgetCreated', ...)"
    )
    it.todo(
      "the v2 domWidgetCreated handler fires synchronously after widget construction, before the DOM is mutated"
    )
  })

  describe('polling workaround replacement', () => {
    it.todo(
      'setInterval polling on node.widgets can be removed when migrating to the domWidgetCreated event'
    )
    it.todo(
      'v2 event fires once per widget creation; no deduplication logic needed in the handler'
    )
  })

  describe('no compat shim required', () => {
    it.todo(
      'there is no v1 hook to shim — extensions must opt-in to domWidgetCreated explicitly in v2'
    )
  })
})
