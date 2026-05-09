// DB cross-ref: BC.21 — S1.H2
// blast_radius: 7.17  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.21 v2 — Custom widget-type registration', () => {
  it.todo('defineNodeExtension nodeCreated callback receives a NodeHandle with widgets() returning registered custom widget types')
  it.todo('WidgetHandle.widgetType reflects the custom type string passed during widget registration')
  it.todo('custom widget registered via v2 is accessible by name via NodeHandle.widget(name)')
  it.todo('WidgetHandle.getOption/setOption round-trips custom widget options after registration')
})
