// Category: BC.12 — Per-widget serialization transform
// DB cross-ref: S4.W3
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/browser_tests/helpers/painter.ts#L70
// blast_radius: 5.58 — compat-floor: blast_radius ≥ 2.0 — MUST pass before v2 ships
// v1 contract: widget.serializeValue = async function(node, index) { return transformedValue }
// Notes: widget.options.serialize===false widgets (e.g. control_after_generate) still occupy a
//        widgets_values slot and still fire serializeValue — excluded only from backend prompt by
//        graphToPrompt(). See research/architecture/widget-serialization-historical-analysis.md.

import { describe, it } from 'vitest'

describe('BC.12 v1 contract — per-widget serialization transform', () => {
  describe('S4.W3 — widget.serializeValue assignment', () => {
    it.todo(
      'assigning widget.serializeValue = async fn(node, index) causes graphToPrompt() to await fn and use its return value in widgets_values'
    )
    it.todo(
      'serializeValue receives the owning node as first argument and the widget\'s positional index in node.widgets as second argument'
    )
    it.todo(
      'if serializeValue is not assigned, graphToPrompt() uses widget.value directly as the serialized value'
    )
    it.todo(
      'serializeValue may return a value of a different type than widget.value (e.g. string expansion of a seed integer)'
    )
  })

  describe('serialize===false widgets (control_after_generate)', () => {
    it.todo(
      'a widget with options.serialize===false still occupies a slot in the widgets_values positional array during serialization'
    )
    it.todo(
      'serializeValue fires for a serialize===false widget and its return value appears in widgets_values even though graphToPrompt() excludes it from the backend prompt'
    )
    it.todo(
      'the positional index passed to serializeValue for widgets after a serialize===false widget is offset by one relative to the backend prompt widgets_values array'
    )
  })
})
