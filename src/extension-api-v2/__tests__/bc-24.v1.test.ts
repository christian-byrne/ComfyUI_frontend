// Category: BC.24 — Node-def schema inspection
// DB cross-ref: S13.SC1
// Exemplar: https://github.com/BennyKok/comfyui-deploy/blob/main/web-plugin/index.js#L1
// blast_radius: 5.00
// compat-floor: blast_radius ≥ 2.0
// v1: direct inspection of nodeData.input.required, nodeData.input.optional, nodeData.output,
//     nodeData.output_node, nodeData.category, InputSpec sentinel tuples

import { describe, it } from 'vitest'

describe('BC.24 v1 contract — Node-def schema inspection', () => {
  describe('S13.SC1 — input slot inspection', () => {
    it.todo(
      'nodeData.input.required is an object mapping slot names to InputSpec tuples [type, opts?]'
    )
    it.todo(
      'nodeData.input.optional is an object mapping slot names to InputSpec tuples and may be undefined'
    )
    it.todo(
      'nodeData.input.hidden is an object or undefined; hidden inputs do not appear in the node UI'
    )
    it.todo(
      'InputSpec tuple first element is a string type name or array of enum values'
    )
  })

  describe('S13.SC1 — output slot inspection', () => {
    it.todo(
      'nodeData.output is an array of output type name strings in slot order'
    )
    it.todo(
      'nodeData.output_node is a boolean indicating whether this node routes data to the server output'
    )
  })

  describe('S13.SC1 — category inspection', () => {
    it.todo(
      'nodeData.category is a slash-delimited string used to place the node in the Add Node menu hierarchy'
    )
  })
})
