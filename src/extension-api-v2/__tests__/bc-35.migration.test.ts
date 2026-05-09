// Category: BC.35 — Pre-queue widget validation
// DB cross-ref: S6.A5
// Exemplar: https://github.com/goodtab/ComfyUI-Custom-Scripts
// blast_radius: 3.10
// compat-floor: blast_radius ≥ 2.0
// migration: app.queuePrompt monkey-patch → comfyApp.on('beforeQueue', event => event.reject(...))

import { describe, it } from 'vitest'

describe('BC.35 migration — pre-queue widget validation', () => {
  describe('queuePrompt monkey-patch replacement', () => {
    it.todo(
      "app.queuePrompt wrapper that throws is replaced by comfyApp.on('beforeQueue', (event) => event.reject(msg))"
    )
    it.todo(
      "v2 compat shim detects monkey-patched app.queuePrompt and wraps the patch logic as a beforeQueue handler"
    )
    it.todo(
      'extensions that previously chain-called the original queuePrompt can remove that pattern entirely in v2'
    )
  })

  describe('error surfacing improvement', () => {
    it.todo(
      'v1 console-only errors are replaced by v2 UI-visible rejection messages via event.reject()'
    )
    it.todo(
      'multiple v1 patchers that silently overwrote each other are now independently stackable via beforeQueue'
    )
  })
})
