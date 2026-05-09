// Category: BC.34 — Settings-panel custom dialog integration
// DB cross-ref: S12.UI3
// Exemplar: https://github.com/goodtab/ComfyUI-Custom-Scripts
// blast_radius: 0.0
// compat-floor: NO (absent API gap — migration from DOM workaround to first-class dialog API)
// migration: innerHTML injection into #comfy-settings-dialog → comfyApp.settings.registerDialog()

import { describe, it } from 'vitest'

describe('BC.34 migration — settings-panel custom dialog integration', () => {
  describe('innerHTML injection replacement', () => {
    it.todo(
      "document.getElementById('comfy-settings-dialog').innerHTML += is replaced by comfyApp.settings.registerDialog()"
    )
    it.todo(
      'raw HTML string dialog content must be converted to a Vue single-file component before migration'
    )
    it.todo(
      'event listeners attached via onclick= in injected HTML must be converted to Vue component methods'
    )
  })

  describe('lifecycle correctness', () => {
    it.todo(
      'v2 registerDialog is called once during extension setup(), not on each settings-panel open'
    )
    it.todo(
      'v2 dialog component is stable across settings panel re-renders; no re-injection needed'
    )
  })
})
