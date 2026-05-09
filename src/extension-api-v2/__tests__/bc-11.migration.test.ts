// Category: BC.11 — Widget imperative state writes
// DB cross-ref: S4.W4, S4.W5, S2.N16
// Exemplar: https://github.com/r-vage/ComfyUI_Eclipse/blob/main/js/eclipse-set-get.js#L9
// Migration: v1 direct property mutation (widget.value, widget.options.values, node.widgets.push/splice)
//            → v2 WidgetHandle.setValue / setOptions / NodeHandle.addWidget / removeWidget

import { describe, it } from 'vitest'

describe('BC.11 migration — widget imperative state writes', () => {
  describe('widget.value → WidgetHandle.setValue() (S4.W4)', () => {
    it.todo(
      'v1 widget.value = v and v2 WidgetHandle.setValue(v) both result in the same displayed value on the canvas'
    )
    it.todo(
      'v1 direct assignment does not fire on(\'change\') listeners; v2 setValue() does — callers must not assume silence'
    )
    it.todo(
      'v2 setValue() raises InvalidValueError for out-of-range COMBO values; v1 assignment silently accepts them'
    )
  })

  describe('widget.options.values → WidgetHandle.setOptions() (S4.W5)', () => {
    it.todo(
      'v1 widget.options.values = [...] and v2 WidgetHandle.setOptions({ values: [...] }) both replace the COMBO option list'
    )
    it.todo(
      'v1 does not auto-reset stale current value; v2 setOptions() does — migration callers must handle the resulting on(\'change\') event'
    )
  })

  describe('node.widgets.push/splice → NodeHandle.addWidget/removeWidget (S2.N16)', () => {
    it.todo(
      'v1 node.widgets.push(w) and v2 NodeHandle.addWidget(opts) both result in the widget being present in the node\'s widget list after the call'
    )
    it.todo(
      'v1 splice causes widgets_values positional drift; v2 addWidget uses named-map and produces no drift even when inserted mid-list'
    )
    it.todo(
      'v1 push requires a manual setSize reflow; v2 addWidget performs it automatically — do not double-reflow when migrating'
    )
    it.todo(
      'v2 removeWidget(name) correctly finds the widget by name regardless of its position in the list; v1 splice requires the caller to track the index'
    )
  })
})
