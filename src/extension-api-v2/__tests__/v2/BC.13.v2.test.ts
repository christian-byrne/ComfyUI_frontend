// DB cross-ref: BC.13 — S2.N6,S2.N15
// blast_radius: 47.07  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.13 v2 — Per-node serialization interception', () => {
  it.todo('NodeHandle.on("beforeSerialize", handler) fires before the node is written to workflow JSON')
  it.todo('beforeSerialize handler can mutate the serialized node object before it is written')
  it.todo('per-node beforeSerialize fires for each node individually, not once for the whole graph')
  it.todo('mutations made in beforeSerialize appear in the final workflow JSON output')
})
