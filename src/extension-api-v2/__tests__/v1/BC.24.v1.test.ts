// DB cross-ref: BC.24 — S13.SC1
// blast_radius: 22.43  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.24 v1 — Node-def schema inspection', () => {
  it.todo('app.registerExtension({ beforeRegisterNodeDef }) receives (nodeType, nodeData) where nodeData matches the server-returned node definition schema')
  it.todo('reading nodeData.input.required and nodeData.input.optional in beforeRegisterNodeDef returns the expected input slot descriptors')
  it.todo('reading nodeData.output, nodeData.output_name, and nodeData.output_is_list provides correct output slot metadata')
  it.todo('mutations to nodeData inside beforeRegisterNodeDef are visible to subsequently-registered extensions for the same node type')
})
