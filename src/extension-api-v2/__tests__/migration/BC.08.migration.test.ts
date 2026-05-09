// DB cross-ref: BC.08 — S10.D2
// blast_radius: 11.81  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.08 migration — Programmatic linking', () => {
  it.todo('v1 node.connect(slot, targetNode, targetSlot) produces a link with the same source/target slot indices as v2 graph.createLink()')
  it.todo('v1 node.disconnectInput(slot) removes the link and fires connectionChanged with connected=false, matching v2 disconnectInput behavior')
  it.todo('link created via v1 node.connect is serialized identically to a link created via v2 programmatic linking API')
})
