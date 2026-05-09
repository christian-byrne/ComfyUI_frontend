// DB cross-ref: BC.10 — S4.W1,S2.N14
// blast_radius: 32.22  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.10 migration — Widget value subscription', () => {
  it.todo('v1 widget.callback chain fires with the same (value, widget, node) arguments as v2 on("widgetChanged") event payload')
  it.todo('v1 nodeType.prototype.onWidgetChanged receives (name, value, oldValue, widget) matching v2 widgetChanged event fields')
  it.todo('both v1 widget.callback and v2 widgetChanged fire on every programmatic widget.value assignment, not just UI interactions')
  it.todo('multiple v1 chained callbacks and multiple v2 widgetChanged listeners are all invoked in registration order')
})
