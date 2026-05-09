// Category: BC.36 — PrimeVue widget component API surface
// DB cross-ref: S4.W1, S4.W4, S4.W5
// Exemplar: none (new API surface)
// blast_radius: 3.80
// compat-floor: blast_radius ≥ 2.0
// migration: widget.options.* direct mutation → WidgetHandle.setOptions<T>() typed per-component subsets

import { describe, it } from 'vitest'

describe('BC.36 migration — PrimeVue widget component API surface', () => {
  describe('options bag to setOptions migration', () => {
    it.todo(
      'widget.options.values = [...] is replaced by WidgetHandle.setOptions<SelectOptions>({ values: [...] })'
    )
    it.todo(
      'widget.options.min / .max / .step are replaced by WidgetHandle.setOptions<SliderOptions>({ min, max, step })'
    )
    it.todo(
      'v2 compat shim intercepts widget.options writes and forwards them to setOptions with a deprecation warning'
    )
  })

  describe('disabled/readonly migration', () => {
    it.todo(
      'widget.options.disabled = true is replaced by WidgetHandle.setDisabled(true)'
    )
    it.todo(
      'widget.options.readonly = true is replaced by WidgetHandle.setReadOnly(true)'
    )
  })

  describe('exclusion rule enforcement', () => {
    it.todo(
      'v1 style/class/pt options written via widget.options are silently dropped by the v2 compat shim'
    )
    it.todo(
      'v2 setOptions<T>() TypeScript overloads prevent style/class/pt from being passed at compile time'
    )
  })
})
