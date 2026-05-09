// Category: BC.12 — Per-widget serialization transform
// DB cross-ref: S4.W3
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/browser_tests/helpers/painter.ts#L70
// Migration: v1 widget.serializeValue positional index → v2 WidgetHandle.on('serialize') / setSerializeValue name-based

import { describe, it } from 'vitest'

describe('BC.12 migration — per-widget serialization transform', () => {
  describe('serializeValue → on(\'serialize\') round-trip equivalence', () => {
    it.todo(
      'a v1 widget.serializeValue that returns a transformed value and a v2 on(\'serialize\') returning the same transformation produce identical output in the serialized workflow JSON'
    )
    it.todo(
      'v1 serializeValue receives a positional index; v2 on(\'serialize\') does not — callers relying on the index for slot lookup must migrate to name-based lookup'
    )
    it.todo(
      'async transforms: both v1 serializeValue and v2 on(\'serialize\') are awaited by graphToPrompt() before the workflow is finalized'
    )
  })

  describe('serialize===false widget compat', () => {
    it.todo(
      'v1 positional index for a widget after control_after_generate is offset by 1 relative to the backend prompt; v2 named-map has no such offset'
    )
    it.todo(
      'migrate: v1 code that hard-codes an index offset for serialize===false slots must be rewritten to use WidgetHandle identity by name in v2'
    )
    it.todo(
      'widgets_values_named round-trip: a workflow serialized under v2 with an on(\'serialize\') transform deserializes to the same widget values as the equivalent v1 serializeValue workflow'
    )
  })

  describe('identity stability', () => {
    it.todo(
      'v2 WidgetHandle identity is stable after node.widgets reordering; v1 serializeValue index changes if widgets are reordered — this is the primary reason to migrate'
    )
    it.todo(
      'setSerializeValue(fn) called twice replaces the first registration; widget.serializeValue overwrites also replace — both v1 and v2 are last-write-wins'
    )
  })
})
