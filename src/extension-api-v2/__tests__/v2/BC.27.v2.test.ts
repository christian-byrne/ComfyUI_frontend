// DB cross-ref: BC.27 — S9.R1,S9.G1,S9.L1,S9.S1
// blast_radius: 39.37  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.27 v2 — LiteGraph entity direct manipulation (reroute, group, link, slot)', () => {
  it.todo('v2 path for reroute node manipulation is deferred — NodeHandle link/slot API not yet defined in v2 surface')
  it.todo('v2 path for group manipulation is deferred — a GroupHandle abstraction is planned but not yet available')
  it.todo('NodeHandle.on("connected") fires when a link is formed, providing slot and peer entityId without direct LiteGraph access')
  it.todo('NodeHandle.on("disconnected") fires when a link is removed, providing slot index without direct LiteGraph access')
})
