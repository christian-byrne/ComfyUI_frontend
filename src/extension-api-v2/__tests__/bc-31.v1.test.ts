// Category: BC.31 — DOM injection and style management
// DB cross-ref: S16.DOM1, S16.DOM2, S16.DOM3, S16.DOM4
// Exemplar: https://github.com/kijai/ComfyUI-KJNodes/blob/main/web/js/help_popup.js
// Surface: S16 — DOM injection (new surface family, not previously tracked)
// Occurrence signal: DOM1=354, DOM2=364, DOM3=443, DOM4=232 packages (Notion API research 2026-05-08)

import { describe, it } from 'vitest'

describe('BC.31 v1 contract — DOM injection and style management', () => {
  describe('S16.DOM1 — style tag injection into document.head', () => {
    it.todo(
      'extension can append a <style> element to document.head and styles take effect'
    )
    it.todo(
      'multiple extensions injecting styles do not collide (last-write-wins for same selector)'
    )
    it.todo(
      'styles injected during setup() are present before nodeCreated fires'
    )
  })

  describe('S16.DOM2 — arbitrary element injection into document.body', () => {
    it.todo(
      'extension can appendChild an arbitrary element to document.body'
    )
    it.todo(
      'injected panel element is accessible via document.getElementById after setup'
    )
  })

  describe('S16.DOM3 — innerHTML rendering (unsanitized HTML strings)', () => {
    it.todo(
      'extension can set innerHTML on a container element it owns'
    )
    it.todo(
      'innerHTML content is rendered immediately without requiring a Vue tick'
    )
  })

  describe('S16.DOM4 — external script/asset loading via DOM', () => {
    it.todo(
      'extension can dynamically create and append a <script> element to load external code'
    )
    it.todo(
      'extension can create a <link rel="stylesheet"> element for external CSS'
    )
  })
})
