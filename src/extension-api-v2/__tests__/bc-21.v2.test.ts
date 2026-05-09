// Category: BC.21 — Custom widget-type registration
// DB cross-ref: S1.H2
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/
// blast_radius: 4.32
// compat-floor: blast_radius ≥ 2.0
// v2 replacement: defineWidgetExtension({ widgetType: 'MYWIDGET', create(handle, inputData) { ... } })

import { describe, it } from 'vitest'

describe('BC.21 v2 contract — Custom widget-type registration', () => {
  describe('defineWidgetExtension() — declarative widget registration', () => {
    it.todo(
      'defineWidgetExtension({ widgetType, create }) registers the type before any nodeCreated fires'
    )
    it.todo(
      'create(handle, inputData) is called with a typed WidgetHandle and the input spec tuple'
    )
    it.todo(
      'widget registered via defineWidgetExtension appears in NodeHandle.widgets after node creation'
    )
    it.todo(
      'widget is removed from all nodes when the extension scope is disposed'
    )
    it.todo(
      'defineWidgetExtension throws if widgetType is an empty string or conflicts with a built-in type'
    )
  })
})
