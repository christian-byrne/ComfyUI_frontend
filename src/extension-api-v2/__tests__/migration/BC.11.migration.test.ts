// DB cross-ref: BC.11 — S4.W4,S4.W5,S2.N16
// blast_radius: 28.42  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.11 migration — Widget imperative state writes', () => {
  it.todo('v1 widget.options.values = [...] COMBO update is reflected in the rendered dropdown identically to v2 widget.updateOptions()')
  it.todo('v1 direct widget.value write triggers the same reactive update path as v2 widget.setValue() for downstream subscribers')
  it.todo('iterating v1 node.widgets array produces the same widget set in the same order as v2 node.widgets readonly accessor')
  it.todo('removing a widget via v1 node.widgets.splice() leaves the node in the same state as v2 node.removeWidget()')
})
