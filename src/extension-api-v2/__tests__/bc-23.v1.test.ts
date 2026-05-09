// Category: BC.23 — Node property bag mutations
// DB cross-ref: S2.N18
// Exemplar: https://github.com/rgthree/rgthree-comfy/blob/main/src_web/comfyui/seed.ts#L78
// blast_radius: 5.82
// compat-floor: blast_radius ≥ 2.0
// v1: node.prototype.onPropertyChanged = function(name, value, prevValue) { ... }
//     or node.properties.myKey = value

import { describe, it } from 'vitest'

describe('BC.23 v1 contract — Node property bag mutations', () => {
  describe('S2.N18 — onPropertyChanged lifecycle hook', () => {
    it.todo(
      'assigning node.prototype.onPropertyChanged wires a callback invoked when any property value changes'
    )
    it.todo(
      'onPropertyChanged receives (name, value, prevValue) with correct types for each argument'
    )
    it.todo(
      'onPropertyChanged is NOT called for properties set before the node is created'
    )
    it.todo(
      'multiple prototype patches to onPropertyChanged: later patch overwrites earlier unless manually chained'
    )
  })

  describe('S2.N18 — direct node.properties mutation', () => {
    it.todo(
      'setting node.properties.myKey = value persists the value through graph serialization and deserialization'
    )
    it.todo(
      'direct property mutation does not automatically trigger onPropertyChanged'
    )
    it.todo(
      'properties bag survives node clone (node.clone() copies node.properties by value)'
    )
  })
})
