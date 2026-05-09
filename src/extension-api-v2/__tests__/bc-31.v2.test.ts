// Category: BC.31 — DOM injection and style management
// DB cross-ref: S16.DOM1, S16.DOM2, S16.DOM3, S16.DOM4
// Exemplar: https://github.com/kijai/ComfyUI-KJNodes/blob/main/web/js/help_popup.js
// v2 replacement: extensionManager.injectStyles(css), extension.addPanel(opts), extension.addToolbarItem(opts)

import { describe, it } from 'vitest'

describe('BC.31 v2 contract — DOM injection and style management', () => {
  describe('injectStyles(css) — scoped style injection', () => {
    it.todo(
      'extensionManager.injectStyles(css) appends a scoped <style> element to document.head'
    )
    it.todo(
      'styles injected via injectStyles() are automatically removed when the extension is unregistered'
    )
    it.todo(
      'multiple calls to injectStyles() do not create duplicate <style> tags for the same content'
    )
    it.todo(
      'injectStyles() returns a cleanup handle; calling it removes the style tag'
    )
  })

  describe('addPanel(opts) — managed panel injection', () => {
    it.todo(
      'extension.addPanel({ id, render }) mounts a panel into the host-managed panel container'
    )
    it.todo(
      'panel mounted via addPanel() is accessible via document.getElementById(opts.id)'
    )
    it.todo(
      'panel is unmounted when the extension scope is disposed'
    )
  })

  describe('addToolbarItem(opts) — toolbar registration', () => {
    it.todo(
      'extension.addToolbarItem({ id, icon, tooltip, action }) appends an item to the ComfyUI toolbar'
    )
    it.todo(
      'clicking the toolbar item invokes opts.action with the correct context'
    )
    it.todo(
      'toolbar item is removed when the extension scope is disposed'
    )
  })

  describe('safe HTML rendering', () => {
    it.todo(
      'v2 HTML rendering API sanitizes content before insertion (no raw innerHTML path)'
    )
    it.todo(
      'safe rendering API accepts a Vue component as an alternative to raw HTML'
    )
  })
})
