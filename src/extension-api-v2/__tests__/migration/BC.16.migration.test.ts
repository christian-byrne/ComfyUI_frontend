// DB cross-ref: BC.16 — S2.N2
// blast_radius: 5.74  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.16 migration — Execution output consumption (per-node)', () => {
  it.todo('v1 nodeType.prototype.onExecuted(data) receives the same backend output payload as v2 nodeExecuted event.output')
  it.todo('v2 nodeExecuted fires once per node execution completion, matching v1 onExecuted invocation count per prompt run')
  it.todo('image/text output consumed in v1 onExecuted produces the same widget display state as equivalent v2 nodeExecuted handler')
})
