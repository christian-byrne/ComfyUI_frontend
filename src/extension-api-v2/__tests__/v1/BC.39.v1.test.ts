// DB cross-ref: BC.39 — S17.SB1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.39 v1 — Subgraph boundary event propagation', () => {
  it.todo('a nodeCreated callback registered on the parent graph fires when a node is added inside an open subgraph')
  it.todo('app.graph.change() called from within a subgraph propagates a dirty signal to the root graph observable')
  it.todo('link events emitted at a subgraph boundary (input/output nodes) are observable from a root-level onConnectionChange extension hook')
})
