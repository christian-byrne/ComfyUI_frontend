// Category: BC.23 — Node property bag mutations
// DB cross-ref: S2.N18
// Exemplar: https://github.com/rgthree/rgthree-comfy/blob/main/src_web/comfyui/seed.ts#L78
// blast_radius: 5.82
// compat-floor: blast_radius ≥ 2.0
// v2 replacement: NodeHandle.on('propertyChanged', (name, value, prevValue) => { ... })
//                 NodeHandle.setProperty(name, value)

import { describe, it } from 'vitest'

describe('BC.23 v2 contract — Node property bag mutations', () => {
  describe('NodeHandle.on(\'propertyChanged\') — reactive property observation', () => {
    it.todo(
      'NodeHandle.on(\'propertyChanged\', cb) fires cb with (name, value, prevValue) on every property write'
    )
    it.todo(
      'propertyChanged event fires for mutations made via both NodeHandle.setProperty and direct node.properties writes'
    )
    it.todo(
      'multiple listeners on the same node all receive the event independently'
    )
    it.todo(
      'listener registered via NodeHandle.on is removed when the extension scope is disposed'
    )
  })

  describe('NodeHandle.setProperty() — managed property mutation', () => {
    it.todo(
      'NodeHandle.setProperty(name, value) updates node.properties[name] and triggers propertyChanged listeners'
    )
    it.todo(
      'value set via setProperty survives graph serialization and deserialization'
    )
    it.todo(
      'setProperty with the same value as current does not fire propertyChanged (no-op guard)'
    )
  })
})
