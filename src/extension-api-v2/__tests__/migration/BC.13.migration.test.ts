// DB cross-ref: BC.13 — S2.N6,S2.N15
// blast_radius: 47.07  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.13 migration — Per-node serialization interception', () => {
  it.todo('v1 nodeType.prototype.onSerialize(data) mutation of data object injects the same extra fields as v2 nodeSerialize event.data mutation')
  it.todo('custom fields injected via v1 onSerialize are round-tripped through onConfigure with the same values as v2 nodeSerialize → nodeConfigured')
  it.todo('v2 nodeSerialize event fires at the same serialization point as v1 onSerialize, before the node data is merged into the graph JSON')
  it.todo('v1 node.serialize() return value structure matches the v2 serialized node object shape field-for-field')
})
