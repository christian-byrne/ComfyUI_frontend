// DB cross-ref: BC.36 — S4.W1,S4.W4,S4.W5
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.36 v1 — PrimeVue widget component API surface', () => {
  it.todo('a widget registered via getCustomWidgets that returns a VueNode wrapper exposes widget.value as a reactive ref readable from outside the component')
  it.todo('setting widget.value from outside the component updates the rendered PrimeVue input on the next tick')
  it.todo('calling widget.callback(value) on a PrimeVue-backed widget triggers the standard ComfyUI widget change pipeline')
})
