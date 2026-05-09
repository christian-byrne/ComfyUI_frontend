// Category: BC.13 — Per-node serialization interception
// DB cross-ref: S2.N6, S2.N15
// Exemplar: https://github.com/Azornes/Comfyui-LayerForge/blob/main/js/CanvasView.js#L1438
// blast_radius: 6.36 — compat-floor: blast_radius ≥ 2.0 — MUST pass before v2 ships
// v2 replacement: NodeHandle.on('serialize', (data) => { data.myData = ... }) — named map round-trip
// Notes: v2 uses widgets_values_named keyed by widget name, eliminating positional drift.
//        NaN→null pipeline: v2 serializer logs a warning and substitutes the widget's declared default.

import { describe, it } from 'vitest'

describe('BC.13 v2 contract — per-node serialization interception', () => {
  describe('NodeHandle.on(\'serialize\', fn) — node-level serialization hook (S2.N6, S2.N15)', () => {
    it.todo(
      'NodeHandle.on(\'serialize\', fn) fires fn with the serialization data object during graphToPrompt(); fn may add custom fields'
    )
    it.todo(
      'custom fields added to data inside on(\'serialize\') are present in the workflow JSON under the node\'s entry'
    )
    it.todo(
      'multiple on(\'serialize\') listeners from different extensions all fire and their custom fields coexist without overwriting each other (assuming distinct keys)'
    )
    it.todo(
      'on(\'serialize\') listener is removed when the extension scope is disposed; subsequent serializations omit the custom fields'
    )
  })

  describe('named-map round-trip (widgets_values_named)', () => {
    it.todo(
      'v2 serialization stores widget values in a named map (widgets_values_named) keyed by widget name; the map survives a JSON round-trip with no null drift'
    )
    it.todo(
      'a workflow serialized with three widgets including one serialize===false widget deserializes with correct values for all three regardless of insertion order'
    )
    it.todo(
      'widgets added or removed between two serialization passes do not corrupt the named-map entries for unaffected widgets'
    )
  })

  describe('NaN→null guard (numeric widget safety)', () => {
    it.todo(
      'when a numeric widget value resolves to NaN at serialization time, v2 logs a console warning and substitutes the widget\'s declared default value'
    )
    it.todo(
      'the substituted default value round-trips through JSON correctly; the deserialized node shows the default, not null'
    )
    it.todo(
      'NaN guard fires per-widget and does not abort the serialization of the remaining widgets on the same node'
    )
  })
})
