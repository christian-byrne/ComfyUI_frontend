// Category: BC.36 — PrimeVue widget component API surface
// DB cross-ref: S4.W1, S4.W4, S4.W5
// Exemplar: none (new API surface)
// blast_radius: 3.80
// compat-floor: blast_radius ≥ 2.0
// v1 contract: widget.options.values = [...], widget.options.min = 0, widget.options.max = 100
//              (direct mutation of options bag)

import { describe, it } from 'vitest'

describe('BC.36 v1 contract — PrimeVue widget component API surface', () => {
  describe('S4.W1 — options bag direct mutation (select/combo)', () => {
    it.todo(
      'widget.options.values = [...] replaces the dropdown choices on a COMBO widget at runtime'
    )
    it.todo(
      'widget.options.values mutation takes effect immediately on the next render without triggering a callback'
    )
    it.todo(
      'setting widget.options.values to an empty array renders an empty dropdown without error'
    )
  })

  describe('S4.W4 — options bag direct mutation (number/slider)', () => {
    it.todo(
      'widget.options.min and widget.options.max constrain the slider range when set directly'
    )
    it.todo(
      'widget.options.step controls the increment of a number widget when set on options directly'
    )
  })

  describe('S4.W5 — disabled / readonly via options bag', () => {
    it.todo(
      'widget.options.disabled = true disables the widget control in v1 options-bag approach'
    )
    it.todo(
      'widget.options.readonly = true makes the widget read-only without affecting its value'
    )
  })
})
