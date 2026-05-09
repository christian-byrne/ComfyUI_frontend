// Category: BC.38 — Canvas mode observation
// DB cross-ref: S17.AM1
// Exemplar: https://www.notion.so/comfy-org/Develop-a-custom-node-from-scratch-pain-point-assessment-33c6d73d365080f49126c0b5affa7559
// blast_radius: 0.0
// compat-floor: NO (absent API gap — migration from broken workarounds to proposed v2 event)
// migration: polling / heuristics → comfyApp.on('canvasModeChanged', handler)

import { describe, it } from 'vitest'

describe('BC.38 migration — canvas mode observation', () => {
  describe('polling replacement', () => {
    it.todo(
      "setInterval polling on app.canvas.mode is replaced by comfyApp.on('canvasModeChanged', ...)"
    )
    it.todo(
      'v2 event-based approach removes the need to track previous mode to detect transitions'
    )
  })

  describe('heuristic replacement', () => {
    it.todo(
      "DOM-class heuristics used to infer canvas mode should be deleted in favor of comfyApp.on('canvasModeChanged')"
    )
    it.todo(
      'extensions that imported appModeStore directly must switch to the event API to remain JS-extension-compatible'
    )
  })

  describe('no compat shim available', () => {
    it.todo(
      'there is no v1 hook to shim — extensions must explicitly opt in to canvasModeChanged when v2 ships'
    )
  })
})
