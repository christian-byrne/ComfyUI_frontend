// DB cross-ref: BC.20 — S1.H5,S1.H6,S8.P1
// blast_radius: 27.49  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.20 v2 — Custom node-type registration (frontend-only / virtual)', () => {
  it.todo('defineNodeExtension with a nodeTypes filter restricts nodeCreated to only those node type names')
  it.todo('a frontend-only virtual node type registered via defineNodeExtension does not require a backend counterpart')
  it.todo('NodeHandle.type matches the registered nodeType string for a custom-registered node')
  it.todo('custom node type can define default widgets that appear on nodeCreated without backend schema')
})
