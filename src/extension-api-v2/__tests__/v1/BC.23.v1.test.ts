// DB cross-ref: BC.23 — S2.N18
// blast_radius: 14.42  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.23 v1 — Node property bag mutations', () => {
  it.todo('direct assignment to node.properties[key] is reflected when the graph is serialized to JSON')
  it.todo('app.registerExtension({ nodeCreated }) can write arbitrary keys to node.properties without throwing')
  it.todo('node.properties survives a graph load/save round-trip with v1-injected keys intact')
  it.todo('mutations to node.properties do not interfere with node.widgets_values serialization')
})
