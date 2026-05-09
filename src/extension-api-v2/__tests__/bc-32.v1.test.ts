// Category: BC.32 — Embedded framework runtimes and Vue widget bundling
// DB cross-ref: S16.VUE1
// Exemplar: ComfyUI-NKD-Sigmas-Curve (aggregate — Notion API research §2.9)
// Occurrence signal: 9 packages confirmed bundling their own Vue instance (Notion 2026-05-08)

import { describe, it } from 'vitest'

describe('BC.32 v1 contract — embedded framework runtimes and Vue widget bundling', () => {
  describe('S16.VUE1 — extension bundles its own Vue createApp instance', () => {
    it.todo(
      'extension can call createApp(Component).mount(el) inside a DOM widget element'
    )
    it.todo(
      'the mounted Vue app is isolated from the host app (no shared provide/inject)'
    )
    it.todo(
      "extension's bundled Vue instance does not have access to host app's i18n plugin"
    )
    it.todo(
      "extension's bundled Vue instance does not have access to host app's Pinia stores"
    )
    it.todo(
      "extension's bundled Vue instance does not receive host app's theme/CSS variables by default"
    )
  })

  describe('isolation hazards', () => {
    it.todo(
      'two extensions each bundling Vue do not conflict with each other at runtime'
    )
    it.todo(
      "extension's bundled Vue app survives node removal without explicit unmount call (memory leak baseline)"
    )
  })
})
