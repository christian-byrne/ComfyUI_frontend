// Category: BC.23 — Node property bag mutations
// DB cross-ref: S2.N18
// Exemplar: https://github.com/rgthree/rgthree-comfy/blob/main/src_web/comfyui/seed.ts#L78
// blast_radius: 5.82
// compat-floor: blast_radius ≥ 2.0
// Migration: v1 onPropertyChanged prototype patch / node.properties direct write
//         → v2 NodeHandle.on('propertyChanged') / NodeHandle.setProperty

import { describe, it } from 'vitest'

describe('BC.23 migration — Node property bag mutations', () => {
  describe('observer parity (S2.N18)', () => {
    it.todo(
      'v1 onPropertyChanged and v2 propertyChanged listener both receive identical (name, value, prevValue) for the same mutation'
    )
    it.todo(
      'v2 listener fires for writes made via NodeHandle.setProperty; v1 hook fires for the same via native property set path'
    )
  })

  describe('persistence parity', () => {
    it.todo(
      'property written via v1 node.properties.myKey and v2 NodeHandle.setProperty both round-trip through JSON serialization identically'
    )
    it.todo(
      'property survives node.clone() in both v1 and v2 paths'
    )
  })

  describe('scope cleanup on dispose', () => {
    it.todo(
      'v1 prototype.onPropertyChanged persists after extension unregisters; v2 listener is removed on dispose'
    )
    it.todo(
      'v2 listener removal on dispose does not silence listeners registered by other extensions on the same node'
    )
  })
})
