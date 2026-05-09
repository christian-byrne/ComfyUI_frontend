// Category: BC.11 — Widget imperative state writes
// DB cross-ref: S4.W4, S4.W5, S2.N16
// Exemplar: https://github.com/r-vage/ComfyUI_Eclipse/blob/main/js/eclipse-set-get.js#L9
// blast_radius: 5.81 — compat-floor: blast_radius ≥ 2.0 — MUST pass before v2 ships
// v1 contract: widget.value = newVal
//              widget.options.values = [...]
//              node.widgets.splice(i, 0, w)
//              node.widgets.push(w)

import { describe, it } from 'vitest'

describe('BC.11 v1 contract — widget imperative state writes', () => {
  describe('S4.W4 — widget.value direct assignment', () => {
    it.todo(
      'assigning widget.value = newVal updates the displayed value on the next canvas redraw without triggering widget.callback'
    )
    it.todo(
      'widget.value assignment to a value outside the COMBO options list does not throw but may display an invalid state'
    )
    it.todo(
      'reading widget.value immediately after assignment returns the assigned value'
    )
  })

  describe('S4.W5 — widget.options.values mutation (COMBO options)', () => {
    it.todo(
      'assigning widget.options.values = [...] replaces the COMBO dropdown options on the next canvas redraw'
    )
    it.todo(
      'if the current widget.value is absent from the new options list, the widget continues to display the stale value (no auto-reset in v1)'
    )
    it.todo(
      'widget.options.values mutation does not fire widget.callback'
    )
  })

  describe('S2.N16 — node.widgets array mutation (insert / push)', () => {
    it.todo(
      'node.widgets.push(widget) appends the widget to the node\'s widget list and it renders on the next canvas redraw'
    )
    it.todo(
      'node.widgets.splice(i, 0, widget) inserts a widget at position i and shifts subsequent widgets\' positional indices'
    )
    it.todo(
      'inserting a widget via splice causes widgets_values positional drift if not followed by a node size reflow'
    )
    it.todo(
      'node.widgets.push does not update node.size; calling setSize([...computeSize()]) is required to avoid slot overlap'
    )
  })
})
