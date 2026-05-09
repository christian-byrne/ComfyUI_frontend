// DB cross-ref: BC.08 — S10.D2
// blast_radius: 11.81  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.08 v1 — Programmatic linking', () => {
  it.todo('app.graph.connectNodes(srcId, srcSlot, dstId, dstSlot) creates a link visible in graph.links')
  it.todo('programmatic link triggers onConnectionsChange on both source and destination nodes')
  it.todo('link created via connectNodes survives a serialize → deserialize round-trip')
})
