// DB cross-ref: BC.39 — S17.SB1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.39 v2 — Subgraph boundary event propagation', () => {
  it.todo('NodeHandle.on("executed") fires for nodes inside a subgraph when the subgraph execution completes, propagated through the subgraph boundary')
  it.todo('NodeHandle.on("removed") fires for subgraph-interior nodes when the containing subgraph node is deleted from the parent graph')
  it.todo('defineNodeExtension nodeCreated receives NodeHandle for nodes added dynamically inside a subgraph after initial load')
})
