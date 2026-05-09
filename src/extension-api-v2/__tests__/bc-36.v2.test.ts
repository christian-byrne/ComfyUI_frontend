// Category: BC.36 — PrimeVue widget component API surface
// DB cross-ref: S4.W1, S4.W4, S4.W5
// Exemplar: none (new API surface)
// blast_radius: 3.80
// compat-floor: blast_radius ≥ 2.0
// v2 contract: typed WidgetHandle.setOptions<SliderOptions>({ min, max, step })
//              15 PrimeVue components: Button, InputText, Select, ColorPicker, MultiSelect,
//              SelectButton, Slider, Textarea, ToggleSwitch, Chart, Image, ImageCompare,
//              Galleria, FileUpload, TreeSelect
//              Exclusion rule: strip style/class/dt/pt/*Class/*Style
//              disabled/readonly map to D7 first-class fields, not options bag

import { describe, it } from 'vitest'

describe('BC.36 v2 contract — PrimeVue widget component API surface', () => {
  describe('S4.W1 — Select/MultiSelect/SelectButton options', () => {
    it.todo(
      'WidgetHandle.setOptions<SelectOptions>({ values: [...] }) replaces the dropdown choices'
    )
    it.todo(
      'setOptions on a Select widget accepts only the Pick<> subset defined for that component (no style/class/pt)'
    )
    it.todo(
      'passing an unknown option key to setOptions throws a TypeScript compile-time error'
    )
  })

  describe('S4.W4 — Slider options', () => {
    it.todo(
      'WidgetHandle.setOptions<SliderOptions>({ min, max, step }) updates slider bounds reactively'
    )
    it.todo(
      'setOptions on a Slider widget rejects style/class/pt keys per the exclusion rule'
    )
  })

  describe('S4.W5 — disabled / readonly as D7 first-class fields', () => {
    it.todo(
      'WidgetHandle.setDisabled(true) is the v2 replacement for widget.options.disabled = true'
    )
    it.todo(
      'WidgetHandle.setReadOnly(true) is the v2 replacement for widget.options.readonly = true'
    )
    it.todo(
      'disabled and readonly are NOT accepted as keys inside setOptions<T>() — they are separate methods'
    )
  })
})
