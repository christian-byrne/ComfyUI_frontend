// DB cross-ref: BC.21 — S1.H2
// blast_radius: 7.17  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.21 v1 — Custom widget-type registration', () => {
  it.todo('app.registerExtension({ getCustomWidgets }) callback is invoked and returns a widget type map keyed by string name')
  it.todo('a widget type registered via getCustomWidgets is accessible on app.widgets[name] after registration')
  it.todo('custom widget factory receives (node, inputName, inputData, app) arguments matching v1 signature')
  it.todo('widget created by a v1 custom widget type is appended to node.widgets array')
})
