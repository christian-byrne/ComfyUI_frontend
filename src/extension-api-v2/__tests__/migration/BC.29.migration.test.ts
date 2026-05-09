// DB cross-ref: BC.29 — S11.G2,S14.ID1
// blast_radius: 23.56  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.29 migration — Graph enumeration, mutation, and cross-scope identity', () => {
  it.todo('v1 graph.findNodesByType("NodeClass") returns the same node instances as v2 useGraphStore().getNodesByType("NodeClass")')
  it.todo('v1 graph.add(node) followed by graph.remove(node) leaves the graph in the same state as v2 addNode/removeNode API pair')
  it.todo('v1 NodeLocatorId string format parsed manually matches the structured object returned by v2 parseNodeLocatorId()')
  it.todo('node identity across subgraph scopes is consistent: v1 node.id resolves to the same node via v2 graph.getNodeById(id)')
})
