// Category: BC.31 — DOM injection and style management
// DB cross-ref: S16.DOM1, S16.DOM2, S16.DOM3, S16.DOM4
// Exemplar: https://github.com/kijai/ComfyUI-KJNodes/blob/main/web/js/help_popup.js
// Migration: v1 raw DOM injection → v2 injectStyles / addPanel / addToolbarItem

import { describe, it } from 'vitest'

describe('BC.31 migration — DOM injection and style management', () => {
  describe('style injection migration (S16.DOM1)', () => {
    it.todo(
      'v1 document.head.appendChild(styleEl) and v2 injectStyles(css) both result in equivalent CSS applied to document'
    )
    it.todo(
      'v2 injectStyles() produces styles with equal or narrower specificity than v1 raw injection'
    )
  })

  describe('panel injection migration (S16.DOM2)', () => {
    it.todo(
      'v1 document.body.appendChild(el) and v2 addPanel() both result in a panel element present in the DOM'
    )
    it.todo(
      'v2 panel is visible in same position as v1 body-appended element for equivalent opts'
    )
  })

  describe('HTML content migration (S16.DOM3)', () => {
    it.todo(
      'content rendered via v1 innerHTML and v2 safe rendering API produces equivalent visible output for trusted HTML'
    )
    it.todo(
      'v2 safe rendering API blocks XSS payloads that v1 innerHTML would have executed'
    )
  })

  describe('scope cleanup on unregister', () => {
    it.todo(
      'v1 style/panel injections persist after extension unregisters (no cleanup); v2 injections are removed'
    )
    it.todo(
      'v2 cleanup on unregister does not affect styles/panels from other extensions'
    )
  })
})
