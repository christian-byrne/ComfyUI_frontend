// DB cross-ref: BC.01 — S2.N1,S2.N8
// blast_radius: 37.56  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.01 v1 — Node lifecycle: creation', () => {
  it.todo('nodeType.prototype.onNodeCreated is called when a node is instantiated via LiteGraph')
  it.todo('app.registerExtension({ nodeCreated }) callback receives the newly created node instance')
  it.todo('extensions registered with beforeRegisterNodeDef can mutate nodeType.prototype before first instantiation')
  it.todo('widgets added to node.widgets during onNodeCreated are present on the node after creation')
})
