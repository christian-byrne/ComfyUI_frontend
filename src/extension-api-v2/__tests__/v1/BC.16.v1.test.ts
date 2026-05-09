// DB cross-ref: BC.16 — S2.N2
// blast_radius: 5.74  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.16 v1 — Execution output consumption (per-node)', () => {
  it.todo('nodeType.prototype.onExecuted is called with the execution output object after the backend completes the node')
  it.todo('onExecuted receives images/latents arrays and extensions can render them by updating node properties')
  it.todo('onExecuted is not called for nodes that were cached and not re-executed in the current run')
})
