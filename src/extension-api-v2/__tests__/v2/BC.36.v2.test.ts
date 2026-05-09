// DB cross-ref: BC.36 — S4.W1,S4.W4,S4.W5
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.36 v2 — PrimeVue widget component API surface', () => {
  it.todo('WidgetHandle for a PrimeVue-backed widget returns widgetType "primevue" or the specific component name')
  it.todo('WidgetHandle.getValue() and setValue() correctly proxy the underlying PrimeVue component model value')
  it.todo('WidgetHandle.isHidden() and setHidden() correctly proxy the PrimeVue component visibility state')
  it.todo('WidgetHandle.on("valueChange") fires when the PrimeVue component emits its native update event')
})
