// Category: BC.33 — Cross-extension DOM widget creation observation
// DB cross-ref: S4.W6
// Exemplar: https://github.com/goodtab/ComfyUI-Custom-Scripts
// blast_radius: 0.0
// compat-floor: NO (absent API gap — no stable v1 hook exists)
// v1 contract: no stable hook — workaround is MutationObserver on document or polling node.widgets

import { describe, it } from 'vitest'

describe('BC.33 v1 contract — cross-extension DOM widget creation observation', () => {
  describe('S4.W6 — MutationObserver workaround', () => {
    it.todo(
      'extension can observe document.body with MutationObserver to detect newly added DOM widget elements'
    )
    it.todo(
      'extension can poll node.widgets on an interval to detect DOM widgets added by another extension'
    )
    it.todo(
      'MutationObserver approach fires for DOM changes regardless of whether they are ComfyUI widgets'
    )
  })

  describe('S4.W6 — absence of stable hook', () => {
    it.todo(
      'no app.on or app.registerExtension hook reliably fires when a DOM widget is created by a third-party extension'
    )
    it.todo(
      'nodeCreated fires before DOM widgets are appended, so widget list is empty at that point'
    )
  })
})
