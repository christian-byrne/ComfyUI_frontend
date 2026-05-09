// Category: BC.41 — Widget values positional serialization fragility
// DB cross-ref: S17.WV1
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/utils/nodeDefOrderingUtil.ts
// blast_radius: 3.45
// compat-floor: blast_radius ≥ 2.0
// v2 contract: WidgetHandle identity by name not position; widgets_values_named: { seed: 12345, steps: 30 }
//              opt-in; migrateWidgetValues(oldVersion, values) callback proposed.
//              D7 Part 4 (4→2 serialization collapse) + beforeSerialize as partial mitigation.
// Note: Long-term fix blocked on workflow-schema-migration (breaking JSON schema change requiring versioning).

import { describe, it } from 'vitest'

describe('BC.41 v2 contract — widget values positional serialization fragility', () => {
  describe('S17.WV1 — named dict opt-in', () => {
    it.todo(
      'opting in to widgets_values_named serializes widget values as { widgetName: value } instead of positional array'
    )
    it.todo(
      'named dict deserialization matches values by widget name, surviving input add/remove/reorder'
    )
    it.todo(
      'WidgetHandle identity in v2 is by name, so setOptions and getValue APIs are stable across definition changes'
    )
  })

  describe('S17.WV1 — migrateWidgetValues callback', () => {
    it.todo(
      'defineNodeExtension({ migrateWidgetValues(oldVersion, values) { ... } }) transforms legacy positional arrays'
    )
    it.todo(
      'migrateWidgetValues receives the raw positional array from old workflow JSON and must return a named dict'
    )
    it.todo(
      'if migrateWidgetValues is not defined, the runtime falls back to positional alignment for backwards compat'
    )
  })

  describe('S17.WV1 — D7 partial mitigation', () => {
    it.todo(
      'beforeSerialize hook can rewrite widget values before they are serialized, providing a transform layer'
    )
    it.todo(
      'D7 Part 4 (4→2 serialization collapse) reduces the number of widget value positions that can misalign'
    )
  })
})
