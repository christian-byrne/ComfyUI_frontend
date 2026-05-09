// DB cross-ref: BC.02 — S2.N4
// blast_radius: 29.35  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.02 v1 — Node lifecycle: teardown', () => {
  it.todo('nodeType.prototype.onRemoved is called when a node is removed from the graph')
  it.todo('cleanup logic inside onRemoved fires before the node is detached from LiteGraph')
  it.todo('DOM widgets created during onNodeCreated can be cleaned up inside onRemoved without errors')
})
