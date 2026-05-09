// DB cross-ref: BC.41 — S17.WV1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.41 v1 — Widget values positional serialization fragility', () => {
  it.todo('node.widgets_values is an ordered array whose index positions match the order widgets were appended to node.widgets')
  it.todo('a graph JSON round-trip restores each widget.value from widgets_values[i] using the same positional index as before serialization')
  it.todo('inserting a new widget at position 0 via node.widgets.unshift() shifts all subsequent widgets_values indices and breaks deserialization of an older snapshot')
})
