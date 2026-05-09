// DB cross-ref: BC.21 — S1.H2
// blast_radius: 7.17  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.21 migration — Custom widget-type registration', () => {
  it.todo('v1 ComfyExtension.getCustomWidgets() return value registers widget types accessible via nodeType inputs identically to v2 registerWidgetType()')
  it.todo('custom widget registered via v1 getCustomWidgets is instantiated on a node with the same widget.name and widget.type as v2 registration')
  it.todo('v1 custom widget factory function receives the same (node, inputName, inputData, app) arguments as v2 widgetFactory callback')
})
