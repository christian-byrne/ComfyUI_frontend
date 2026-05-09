// Category: BC.32 — Embedded framework runtimes and Vue widget bundling
// DB cross-ref: S16.VUE1
// Exemplar: ComfyUI-NKD-Sigmas-Curve (aggregate — Notion API research §2.9)
// Migration: v1 standalone createApp(Component).mount(el) → v2 registerVueWidget(nodeType, name, Component)

import { describe, it } from 'vitest'

describe('BC.32 migration — embedded framework runtimes and Vue widget bundling', () => {
  describe('rendering equivalence', () => {
    it.todo(
      'Component renders equivalent visible output whether mounted via v1 createApp().mount() or v2 registerVueWidget()'
    )
    it.todo(
      'Component props passed via v2 registerVueWidget() are accessible in the same way as v1 createApp() props'
    )
  })

  describe('shared host access (v2 gain)', () => {
    it.todo(
      'v2 registered Component can read host i18n locale; v1 standalone app cannot without importing its own i18n instance'
    )
    it.todo(
      'v2 registered Component can read Pinia store state; v1 standalone app sees an isolated Pinia instance'
    )
  })

  describe('no double-Vue', () => {
    it.todo(
      'migrating one extension from createApp().mount() to registerVueWidget() does not load two Vue runtimes simultaneously'
    )
    it.todo(
      'registerVueWidget() reuses the host Vue runtime (same version as host); no version mismatch warnings'
    )
  })

  describe('cleanup regression', () => {
    it.todo(
      'v1 standalone createApp() is not unmounted on node removal unless extension explicitly handles onRemoved; v2 registerVueWidget() always unmounts on node removal'
    )
    it.todo(
      'migrating to v2 eliminates the memory leak present in v1 when nodes are removed without explicit unmount'
    )
  })
})
