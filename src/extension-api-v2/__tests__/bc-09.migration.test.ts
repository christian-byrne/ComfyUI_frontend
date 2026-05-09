// Category: BC.09 — Dynamic slot and output mutation
// DB cross-ref: S10.D1, S10.D3, S15.OS1
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/lib/litegraph/src/canvas/LinkConnector.core.test.ts#L121
// Migration: v1 positional addInput/removeInput/addOutput/removeOutput + manual setSize
//            → v2 name-based NodeHandle.addInput/removeInput/addOutput/removeOutput with auto-reflow

import { describe, it } from 'vitest'

describe('BC.09 migration — dynamic slot and output mutation', () => {
  describe('addInput / addOutput equivalence (S10.D1, S10.D3)', () => {
    it.todo(
      'v1 node.addInput(name, type) and v2 NodeHandle.addInput({ name, type }) both result in an equivalent slot appended to the node'
    )
    it.todo(
      'v1 node.addOutput(name, type) and v2 NodeHandle.addOutput({ name, type }) both result in an equivalent output slot with a matching type'
    )
    it.todo(
      'slot added via v2 addInput() is accessible at the same index position as an equivalent v1 addInput() call (append-only ordering preserved)'
    )
  })

  describe('removeInput / removeOutput equivalence', () => {
    it.todo(
      'v1 node.removeInput(slotIndex) and v2 NodeHandle.removeInput(name) both remove the slot and detach active links; remaining slots have consistent indices'
    )
    it.todo(
      'v2 removeInput(name) correctly identifies the slot when multiple slots exist, matching by name not by position'
    )
  })

  describe('reflow: manual setSize vs. automatic (S15.OS1)', () => {
    it.todo(
      'v1 addInput() + setSize([...computeSize()]) and v2 addInput() auto-reflow both produce a node with equal or greater height to display the new slot'
    )
    it.todo(
      'v2 auto-reflow after removeOutput() shrinks the node to the same height as a v1 removeOutput() + manual setSize() sequence'
    )
    it.todo(
      'omitting setSize after a v1 addInput() call causes slot overlap; v2 auto-reflow never produces this condition'
    )
  })
})
