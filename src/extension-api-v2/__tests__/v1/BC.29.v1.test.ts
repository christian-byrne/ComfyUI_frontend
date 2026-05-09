// DB cross-ref: BC.29 — S11.G2,S14.ID1
// blast_radius: 23.56  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.29 v1 — Graph enumeration, mutation, and cross-scope identity', () => {
  it.todo('app.graph.nodes is an array and iterating it via for-of yields all top-level LGraphNode instances')
  it.todo('app.graph.getNodeById(id) returns the same object reference as app.graph.nodes.find(n => n.id === id)')
  it.todo('node.id is stable across a serialize/configure round-trip when the graph JSON is re-loaded into the same app instance')
  it.todo('app.graph.remove(node) removes the node from app.graph.nodes and cleans up connected links')
})
