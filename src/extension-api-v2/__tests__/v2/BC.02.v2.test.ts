// DB cross-ref: BC.02 — S2.N4
// blast_radius: 29.35  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.02 v2 — Node lifecycle: teardown', () => {
  it.todo('NodeHandle.on("removed", handler) fires when the node is removed from the graph')
  it.todo('onNodeRemoved callback receives the NodeHandle of the node being torn down')
  it.todo('removed event handler is not called again after the node is re-added as a new instance')
})
