// Category: BC.09 — Dynamic slot and output mutation
// DB cross-ref: S10.D1, S10.D3, S15.OS1
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/lib/litegraph/src/canvas/LinkConnector.core.test.ts#L121
// blast_radius: 6.03 — compat-floor: blast_radius ≥ 2.0 — MUST pass before v2 ships
// v1 contract: node.addInput(name, type), node.removeInput(slot)
//              node.addOutput(name, type), node.removeOutput(slot)
//              node.setSize([w, h])

import { describe, it } from 'vitest'

describe('BC.09 v1 contract — dynamic slot and output mutation', () => {
  describe('S10.D1 — addInput / removeInput', () => {
    it.todo(
      'node.addInput(name, type) appends a new input slot to node.inputs and increments node.inputs.length'
    )
    it.todo(
      'node.removeInput(slot) removes the slot at the given index and shifts subsequent slots down by one'
    )
    it.todo(
      'removing an input slot that has an active link also removes the corresponding link from the graph'
    )
    it.todo(
      'addInput with a duplicate name appends a second slot without error (v1 allows duplicates)'
    )
  })

  describe('S10.D3 — addOutput / removeOutput', () => {
    it.todo(
      'node.addOutput(name, type) appends a new output slot to node.outputs and increments node.outputs.length'
    )
    it.todo(
      'node.removeOutput(slot) removes the output slot and detaches all outgoing links on that slot'
    )
    it.todo(
      'removing an output slot does not affect links on other output slots of the same node'
    )
  })

  describe('S15.OS1 — computeSize / setSize reflow', () => {
    it.todo(
      'node.setSize([w, h]) updates node.size to the provided dimensions immediately'
    )
    it.todo(
      'addInput/addOutput followed by node.setSize([...node.computeSize()]) produces a node tall enough to display all slots without overlap'
    )
    it.todo(
      'setSize does not trigger a canvas redraw synchronously; redraw occurs on the next animation frame'
    )
  })
})
