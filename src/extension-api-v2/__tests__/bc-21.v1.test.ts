// Category: BC.21 — Custom widget-type registration
// DB cross-ref: S1.H2
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/
// blast_radius: 4.32
// compat-floor: blast_radius ≥ 2.0
// v1 contract: app.registerExtension({ getCustomWidgets(app) { return { MYWIDGET: (node, inputData, app) => { ... } } } })
// Notes: small family — 2 evidence rows + 1 minor variant (acceptance carve-out)

import { describe, it } from 'vitest'

describe('BC.21 v1 contract — Custom widget-type registration', () => {
  describe('S1.H2 — getCustomWidgets hook', () => {
    it.todo(
      'extension returning a widget factory from getCustomWidgets registers the type globally'
    )
    it.todo(
      'registered widget factory is invoked with (node, inputData, app) when a node with that input type is created'
    )
    it.todo(
      'widget returned by factory is attached to node.widgets array'
    )
    it.todo(
      'two extensions registering distinct widget types do not collide'
    )
    it.todo(
      'registering the same widget type key twice: second registration wins (last-write semantics)'
    )
  })
})
