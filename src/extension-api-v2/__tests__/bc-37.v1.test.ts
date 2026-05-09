// Category: BC.37 — VueNode bridge timing — deferred mount access
// DB cross-ref: S4.W5
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/load3d.ts
// blast_radius: 3.20
// compat-floor: blast_radius ≥ 2.0
// v1 contract: waitForLoad3d(node, callback) — deferred init pattern
//              nodeCreated fires before Vue component mounts; DOM widget value/callback/name are
//              LiteGraph-side only at nodeCreated time

import { describe, it } from 'vitest'

describe('BC.37 v1 contract — VueNode bridge timing (deferred mount access)', () => {
  describe('S4.W5 — nodeCreated timing vs Vue mount', () => {
    it.todo(
      'nodeCreated fires synchronously when the LiteGraph node is constructed, before any Vue component mounts'
    )
    it.todo(
      'accessing a Three.js renderer or DOM widget DOM element inside nodeCreated returns null'
    )
    it.todo(
      'ComponentWidgetImpl value and callback are available at nodeCreated, but Vue props/emits are not'
    )
  })

  describe('S4.W5 — waitForLoad3d deferred init pattern', () => {
    it.todo(
      'waitForLoad3d(node, callback) polls until the VueNode component is mounted, then calls callback'
    )
    it.todo(
      'callback receives a stable reference to the mounted Vue component instance'
    )
    it.todo(
      'if the node is removed before mount completes, waitForLoad3d does not invoke the callback'
    )
  })
})
