// DB cross-ref: BC.39 — S17.SB1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.39 migration — Subgraph boundary event propagation', () => {
  it.todo('v1 onExecuted callback fires for nodes inside a subgraph identically to v2 nodeExecuted event propagated across the subgraph boundary')
  it.todo('v1 onConnectionsChange fires for promoted subgraph boundary slots identically to v2 connectionChanged event at the parent graph level')
  it.todo('promoted widget callback in v1 subgraph reflects the same value change as v2 widgetChanged event on the exposed parent slot')
})
