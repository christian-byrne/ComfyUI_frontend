// Category: BC.32 — Embedded framework runtimes and Vue widget bundling
// DB cross-ref: S16.VUE1
// Exemplar: ComfyUI-NKD-Sigmas-Curve (aggregate — Notion API research §2.9)
// v2 replacement: extension.registerVueWidget(nodeType, name, Component) — shares host Vue instance

import { describe, it } from 'vitest'

describe('BC.32 v2 contract — embedded framework runtimes and Vue widget bundling', () => {
  describe('registerVueWidget(nodeType, name, Component) — shared host Vue instance', () => {
    it.todo(
      'extension.registerVueWidget(nodeType, name, Component) mounts Component inside the host Vue app instance'
    )
    it.todo(
      'Component mounted via registerVueWidget has access to host i18n plugin'
    )
    it.todo(
      'Component mounted via registerVueWidget has access to Pinia stores via useStore()'
    )
    it.todo(
      'Component mounted via registerVueWidget receives host CSS custom properties (theme variables)'
    )
    it.todo(
      'two extensions registering different widgets both mount under the same host app instance'
    )
  })

  describe('lifecycle management', () => {
    it.todo(
      'widget Component is unmounted when the associated node is removed'
    )
    it.todo(
      'widget Component is unmounted when the extension scope is disposed'
    )
    it.todo(
      'unmounting the widget does not trigger host app teardown'
    )
  })

  describe('composable access within registered widget', () => {
    it.todo(
      'useNodeSize() composable is accessible inside a Component registered via registerVueWidget'
    )
    it.todo(
      'useWidgetValue() composable is accessible inside a Component registered via registerVueWidget'
    )
  })
})
