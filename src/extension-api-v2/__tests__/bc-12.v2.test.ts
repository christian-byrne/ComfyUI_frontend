// Category: BC.12 — Per-widget serialization transform
// DB cross-ref: S4.W3
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/browser_tests/helpers/painter.ts#L70
// blast_radius: 5.58 — compat-floor: blast_radius ≥ 2.0 — MUST pass before v2 ships
// v2 replacement: WidgetHandle.on('serialize', fn) or WidgetHandle.setSerializeValue(fn)
// Notes: WidgetHandle identity is by name not position (PR #10392 widgets_values_named migration path).
//        serialize===false widgets still fire the serialize event and still appear in the named map.

import { describe, it } from 'vitest'

describe('BC.12 v2 contract — per-widget serialization transform', () => {
  describe('WidgetHandle.on(\'serialize\', fn) — event-based transform', () => {
    it.todo(
      'WidgetHandle.on(\'serialize\', fn) fires fn during graphToPrompt(); fn may return a transformed value which replaces the default in the named map'
    )
    it.todo(
      'fn receives a SerializeEvent with { node: NodeHandle, widget: WidgetHandle, value } and can set event.serializedValue to override'
    )
    it.todo(
      'if no on(\'serialize\') listener is registered, graphToPrompt() uses WidgetHandle.value directly'
    )
    it.todo(
      'on(\'serialize\') listener is removed when the extension scope is disposed; subsequent serializations use the raw value'
    )
  })

  describe('WidgetHandle.setSerializeValue(fn) — imperative transform assignment', () => {
    it.todo(
      'WidgetHandle.setSerializeValue(async fn) registers fn as the sole serialize transform, superseding any prior assignment'
    )
    it.todo(
      'fn passed to setSerializeValue receives (widgetHandle) and its return value is placed in widgets_values_named under the widget name'
    )
  })

  describe('serialize===false widgets (control_after_generate)', () => {
    it.todo(
      'a widget with serialize===false still appears as a named entry in widgets_values_named during serialization'
    )
    it.todo(
      'on(\'serialize\') fires for a serialize===false WidgetHandle; the returned value is stored in the named map but omitted from the backend prompt'
    )
    it.todo(
      'WidgetHandle identity for serialize===false widgets is stable across slot reordering because it is name-based not position-based'
    )
  })
})
