// DB cross-ref: BC.12 — S4.W3
// blast_radius: 27.94  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.12 v2 — Per-widget serialization transform', () => {
  it.todo('WidgetHandle.on("beforeSerialize", handler) fires before the widget value is written to workflow JSON')
  it.todo('beforeSerialize handler can return a transformed value that replaces the raw widget value in JSON')
  it.todo('WidgetHandle.setSerializeEnabled(false) excludes the widget value from workflow serialization')
  it.todo('isSerializeEnabled() reflects the current serialization-enabled state of the widget')
})
