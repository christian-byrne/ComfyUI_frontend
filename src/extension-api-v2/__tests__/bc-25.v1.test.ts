// Category: BC.25 — Shell UI registration (commands, sidebars, toasts)
// DB cross-ref: S12.UI1
// Exemplar: https://github.com/robertvoy/ComfyUI-Distributed/blob/main/web/main.js#L269
// blast_radius: 4.02
// compat-floor: blast_radius ≥ 2.0
// v1: app.registerExtension({ settings: [...] })
//     extensionManager.registerSidebarTab(opts)
//     commandManager.registerCommand(opts)
//     toastManager.add(opts)

import { describe, it } from 'vitest'

describe('BC.25 v1 contract — Shell UI registration (commands, sidebars, toasts)', () => {
  describe('S12.UI1 — settings registration', () => {
    it.todo(
      'extension passing a settings array to registerExtension adds each setting to the ComfyUI settings panel'
    )
    it.todo(
      'registered setting value is readable via app.ui.settings.getSettingValue(id) after registration'
    )
    it.todo(
      'setting onChange callback fires when the user changes the value in the settings panel'
    )
  })

  describe('S12.UI1 — sidebar tab registration', () => {
    it.todo(
      'extensionManager.registerSidebarTab({ id, icon, title, render }) adds a tab to the sidebar'
    )
    it.todo(
      'render function is called with the tab container element when the tab is first activated'
    )
  })

  describe('S12.UI1 — command registration', () => {
    it.todo(
      'commandManager.registerCommand({ id, label, function }) makes the command invocable by id'
    )
    it.todo(
      'registered command appears in the command palette UI'
    )
  })

  describe('S12.UI1 — toast notifications', () => {
    it.todo(
      'toastManager.add({ severity, summary, detail }) displays a toast notification in the UI'
    )
    it.todo(
      'toast with a specified life value auto-dismisses after the given number of milliseconds'
    )
  })
})
