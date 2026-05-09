// DB cross-ref: BC.10 — S4.W1,S2.N14
// blast_radius: 32.22  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.10 v2 — Widget value subscription', () => {
  it.todo('WidgetHandle.on("valueChange", handler) fires with the new value when widget value changes')
  it.todo('valueChange handler receives both the new value and the previous value')
  it.todo('multiple subscribers on the same WidgetHandle all receive the valueChange event')
  it.todo('WidgetHandle.getValue() returns the current value immediately after a valueChange fires')
})
