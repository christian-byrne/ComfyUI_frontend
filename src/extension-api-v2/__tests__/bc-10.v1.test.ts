// Category: BC.10 — Widget value subscription
// DB cross-ref: S4.W1, S2.N14
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/widgetInputs.ts#L317
// blast_radius: 5.09 — compat-floor: blast_radius ≥ 2.0 — MUST pass before v2 ships
// v1 contract: widget.callback = function(value, ...) { ... }  (chain-patching)
//              node.onWidgetChanged = function(name, value, ...) { ... }

import { describe, it } from 'vitest'

describe('BC.10 v1 contract — widget value subscription', () => {
  describe('S4.W1 — widget.callback chain-patching', () => {
    it.todo(
      'assigning widget.callback invokes the function with the new value whenever the widget is interacted with'
    )
    it.todo(
      'chain-patching preserves the previous callback: saving the old reference and calling it at the end of the new function'
    )
    it.todo(
      'widget.callback receives (value, app, node, pos, event) in that argument order'
    )
    it.todo(
      'if multiple extensions chain-patch widget.callback, all callbacks are invoked in stack order (last-patched first)'
    )
  })

  describe('S2.N14 — node.onWidgetChanged', () => {
    it.todo(
      'node.onWidgetChanged is called once per widget value change with the widget name, new value, old value, and widget reference'
    )
    it.todo(
      'onWidgetChanged fires for every widget on the node, not only those with an explicit callback'
    )
    it.todo(
      'onWidgetChanged fires after widget.callback has been invoked for the same change event'
    )
  })
})
