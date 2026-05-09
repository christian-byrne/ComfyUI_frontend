// Category: BC.41 — Widget values positional serialization fragility
// DB cross-ref: S17.WV1
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/utils/nodeDefOrderingUtil.ts
// blast_radius: 3.45
// compat-floor: blast_radius ≥ 2.0
// v1 contract: node.widgets_values = [v1, v2, v3] positional array;
//              deserialization uses input_order alignment (only works when input_order defined)
// Note: Blocked on workflow-schema-migration. PR #10392 added widgets_values_named opt-in;
//       PR #11884 null guard.

import { describe, it } from 'vitest'

describe('BC.41 v1 contract — widget values positional serialization fragility', () => {
  describe('S17.WV1 — positional array serialization', () => {
    it.todo(
      'node.widgets_values serializes as a positional array [v1, v2, v3] in the workflow JSON'
    )
    it.todo(
      'deserialization assigns values by position using input_order alignment when input_order is defined'
    )
    it.todo(
      'deserialization silently misaligns values when a new input is added before an existing input'
    )
    it.todo(
      'deserialization silently misaligns values when an input is reordered or renamed in the node definition'
    )
  })

  describe('S17.WV1 — silent failure modes', () => {
    it.todo(
      'adding a new required input at position 0 shifts all subsequent widget values by one with no error'
    )
    it.todo(
      'removing an input from the middle of the definition causes trailing widget values to map to wrong inputs'
    )
    it.todo(
      'changing a required input to optional (or vice versa) changes effective index alignment silently'
    )
  })
})
