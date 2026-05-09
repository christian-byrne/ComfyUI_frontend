// Category: BC.25 — Shell UI registration (commands, sidebars, toasts)
// DB cross-ref: S12.UI1
// Exemplar: https://github.com/robertvoy/ComfyUI-Distributed/blob/main/web/main.js#L269
// blast_radius: 4.02
// compat-floor: blast_radius ≥ 2.0
// Migration: v1 extensionManager / commandManager / toastManager imports
//         → v2 comfyApp.registerSidebarTab / registerCommand / showToast (stable import path)

import { describe, it } from 'vitest'

describe('BC.25 migration — Shell UI registration (commands, sidebars, toasts)', () => {
  describe('sidebar tab parity (S12.UI1)', () => {
    it.todo(
      'v1 extensionManager.registerSidebarTab and v2 comfyApp.registerSidebarTab both result in a visible tab with equivalent id and title'
    )
    it.todo(
      'v2 tab render context provides the same root element accessible in v1 raw render callback'
    )
  })

  describe('command parity', () => {
    it.todo(
      'command registered via v1 commandManager.registerCommand and v2 comfyApp.registerCommand are both invocable by the same id'
    )
    it.todo(
      'execute/function callback receives equivalent context objects in v1 and v2'
    )
  })

  describe('toast parity', () => {
    it.todo(
      'v1 toastManager.add and v2 comfyApp.showToast both display a notification with the same severity and summary text'
    )
    it.todo(
      'auto-dismiss timing is equivalent between v1 life and v2 life options'
    )
  })

  describe('scope cleanup on dispose', () => {
    it.todo(
      'v1 sidebar tabs and commands persist after extension unregisters; v2 contributions are removed on dispose'
    )
  })
})
