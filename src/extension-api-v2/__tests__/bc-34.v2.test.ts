// Category: BC.34 — Settings-panel custom dialog integration
// DB cross-ref: S12.UI3
// Exemplar: https://github.com/goodtab/ComfyUI-Custom-Scripts
// blast_radius: 0.0
// compat-floor: NO (absent API gap — new v2 API surface)
// v2 contract: comfyApp.settings.registerDialog({ id, label, component: MyVueComponent })

import { describe, it } from 'vitest'

describe('BC.34 v2 contract — settings-panel custom dialog integration', () => {
  describe('S12.UI3 — registerDialog API', () => {
    it.todo(
      'comfyApp.settings.registerDialog({ id, label, component }) adds a trigger entry to the settings panel'
    )
    it.todo(
      'clicking the settings entry opens the Vue component as a modal dialog managed by ComfyUI'
    )
    it.todo(
      'dialog component receives a close() callback prop it can call to dismiss the modal'
    )
    it.todo(
      'multiple extensions registering dialogs each get independent entries in the settings panel'
    )
  })

  describe('S12.UI3 — settings entry type "dialog-trigger" alternative', () => {
    it.todo(
      "settings entry with type: 'dialog-trigger' and component property renders a button that opens the component"
    )
    it.todo(
      'the dialog component is lazily mounted only when the trigger is clicked, not at registration time'
    )
  })
})
