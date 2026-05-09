// DB cross-ref: BC.01 — S2.N1,S2.N8
// blast_radius: 37.56  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.01 migration — Node lifecycle: creation', () => {
  it.todo('v1 nodeType.prototype.onNodeCreated fires at the same point in node construction as v2 defineNodeExtension nodeCreated callback')
  it.todo('v1 extension.nodeCreated receives the same node instance properties as v2 nodeCreated event argument')
  it.todo('v2 nodeCreated fires once per node instantiation, matching v1 hook invocation count')
  it.todo('v1 nodeType.prototype.onAdded fires at same graph-attach timing as v2 nodeAdded event')
})
