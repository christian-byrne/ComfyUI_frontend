// Category: BC.10 — Widget value subscription
// DB cross-ref: S4.W1, S2.N14
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/widgetInputs.ts#L317
// Migration: v1 widget.callback chain-patching / node.onWidgetChanged
//            → v2 WidgetHandle.on('change') / NodeHandle.on('widgetChanged')

import { describe, it } from 'vitest'

describe('BC.10 migration — widget value subscription', () => {
  describe('widget.callback → WidgetHandle.on(\'change\') (S4.W1)', () => {
    it.todo(
      'v1 widget.callback and v2 WidgetHandle.on(\'change\') both fire with the new value for the same user interaction'
    )
    it.todo(
      'v2 on(\'change\') fires at the same point in the event sequence as the last v1 callback in the chain'
    )
    it.todo(
      'v1 chain-patching does not compose with v2 on(\'change\'): each operates independently; both fire for the same change event'
    )
  })

  describe('node.onWidgetChanged → NodeHandle.on(\'widgetChanged\') (S2.N14)', () => {
    it.todo(
      'v1 node.onWidgetChanged and v2 NodeHandle.on(\'widgetChanged\') both receive equivalent widget name, value, and oldValue for the same change'
    )
    it.todo(
      'v2 widgetChanged payload includes a WidgetHandle reference instead of a raw widget object; WidgetHandle.name matches the widget name'
    )
  })

  describe('ordering and isolation', () => {
    it.todo(
      'v2 on(\'change\') listeners from different extensions on the same widget all fire without one suppressing another'
    )
    it.todo(
      'disposing one extension scope removes only its own on(\'change\') listeners; other extensions\' listeners continue to fire'
    )
  })
})
