// Category: BC.25 — Shell UI registration (commands, sidebars, toasts)
// DB cross-ref: S12.UI1
// Exemplar: https://github.com/robertvoy/ComfyUI-Distributed/blob/main/web/main.js#L269
// blast_radius: 4.02
// compat-floor: blast_radius ≥ 2.0
// v2 replacement: same APIs stabilized — comfyApp.registerSidebarTab(opts),
//                 comfyApp.registerCommand(opts), comfyApp.showToast(opts)
//                 consistent import path from @comfyorg/extension-api

import { describe, it } from 'vitest'

describe('BC.25 v2 contract — Shell UI registration (commands, sidebars, toasts)', () => {
  describe('comfyApp.registerSidebarTab() — stabilized sidebar API', () => {
    it.todo(
      'comfyApp.registerSidebarTab({ id, icon, title, render }) adds a tab accessible in the sidebar'
    )
    it.todo(
      'sidebar tab registered via comfyApp is removed when the extension scope is disposed'
    )
    it.todo(
      'render receives a typed SidebarTabContext instead of a raw DOM element'
    )
  })

  describe('comfyApp.registerCommand() — stabilized command API', () => {
    it.todo(
      'comfyApp.registerCommand({ id, label, execute }) makes the command invocable by id'
    )
    it.todo(
      'command appears in the command palette with the provided label'
    )
    it.todo(
      'command is unregistered when the extension scope is disposed'
    )
  })

  describe('comfyApp.showToast() — stabilized toast API', () => {
    it.todo(
      'comfyApp.showToast({ severity, summary, detail }) displays a toast notification'
    )
    it.todo(
      'showToast with life option auto-dismisses after the specified duration'
    )
    it.todo(
      'showToast returns a handle with a dismiss() method for programmatic removal'
    )
  })
})
