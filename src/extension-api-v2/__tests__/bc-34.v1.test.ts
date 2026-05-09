// Category: BC.34 — Settings-panel custom dialog integration
// DB cross-ref: S12.UI3
// Exemplar: https://github.com/goodtab/ComfyUI-Custom-Scripts
// blast_radius: 0.0
// compat-floor: NO (absent API gap — no v1 hook; workaround is raw DOM injection)
// v1 contract: no hook — workaround is document.getElementById('comfy-settings-dialog').innerHTML += ...

import { describe, it } from 'vitest'

describe('BC.34 v1 contract — settings-panel custom dialog integration', () => {
  describe('S12.UI3 — innerHTML injection workaround', () => {
    it.todo(
      "extension can locate the settings dialog via document.getElementById('comfy-settings-dialog')"
    )
    it.todo(
      'extension can inject a button via innerHTML += that opens a custom modal when clicked'
    )
    it.todo(
      'innerHTML injection persists across settings panel open/close cycles only if the element is not re-rendered'
    )
  })

  describe('S12.UI3 — absence of stable hook', () => {
    it.todo(
      'no registerExtension lifecycle hook fires when the settings panel is opened'
    )
    it.todo(
      'innerHTML injection breaks when ComfyUI re-renders the settings panel, removing the injected content'
    )
  })
})
