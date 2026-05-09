// DB cross-ref: BC.10 — S4.W1,S2.N14
// blast_radius: 32.22  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.10 v1 — Widget value subscription', () => {
  it.todo('replacing widget.callback on an existing widget fires the custom callback when the widget value changes')
  it.todo('nodeType.prototype.onWidgetChanged is called with (name, value, oldValue, widget) on every widget mutation')
  it.todo('chaining the original widget.callback from within a replacement callback preserves default behavior')
  it.todo('widget.callback replacement survives onConfigure re-hydration without being overwritten')
})
