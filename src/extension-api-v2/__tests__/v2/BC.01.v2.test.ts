// DB cross-ref: BC.01 — S2.N1,S2.N8
// blast_radius: 37.56  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.01 v2 — Node lifecycle: creation', () => {
  it.todo('defineNodeExtension nodeCreated callback receives a NodeHandle with valid entityId and comfyClass')
  it.todo('nodeCreated is invoked once per node instance when the node is added to the graph')
  it.todo('NodeHandle.getTitle() returns the node title at creation time')
  it.todo('NodeHandle.getInputs() and getOutputs() reflect the node slot configuration at creation')
})
