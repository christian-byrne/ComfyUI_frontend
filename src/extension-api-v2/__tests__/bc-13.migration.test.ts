// Category: BC.13 — Per-node serialization interception
// DB cross-ref: S2.N6, S2.N15
// Exemplar: https://github.com/Azornes/Comfyui-LayerForge/blob/main/js/CanvasView.js#L1438
// Migration: v1 prototype.serialize patching / node.onSerialize → v2 NodeHandle.on('serialize') named-map

import { describe, it } from 'vitest'

describe('BC.13 migration — per-node serialization interception', () => {
  describe('(a) positional v1 compat: prototype.serialize / onSerialize parity', () => {
    it.todo(
      'custom field injected via v1 prototype.serialize patch and the same field injected via v2 on(\'serialize\') both appear in the serialized workflow JSON under identical keys'
    )
    it.todo(
      'v1 onSerialize and v2 on(\'serialize\') both fire once per graphToPrompt() call with the same node\'s serialization data'
    )
    it.todo(
      'v1 chain of two prototype.serialize patchers produces the same custom-field set as two v2 on(\'serialize\') listeners registered by separate extensions'
    )
  })

  describe('(b) named-map v2 round-trip parity', () => {
    it.todo(
      'a workflow serialized under v2 with widgets_values_named and deserialized produces the same widget values as the equivalent v1 workflow with a positional widgets_values array'
    )
    it.todo(
      'adding a new widget between two existing widgets does not shift the named-map entries for subsequent widgets (v2); it does shift positional indices in v1 — migration callers must stop relying on hardcoded indices'
    )
    it.todo(
      'serialize===false widget (control_after_generate) occupies a named-map entry in v2 with no positional offset; v1 callers that computed offsets must remove that logic'
    )
  })

  describe('(c) null-in-numeric-widget: warning + default substitution', () => {
    it.todo(
      'v1 NaN widget value silently becomes null in the workflow JSON; v2 substitutes the declared default and emits a console.warn — the logged message includes the node id and widget name'
    )
    it.todo(
      'a workflow with a null widgets_values entry for a numeric widget loaded under v2 emits a console.warn and restores the declared default rather than loading null'
    )
    it.todo(
      'the NaN guard does not trigger for non-numeric widgets whose value is legitimately null (e.g. unset optional inputs)'
    )
  })
})
