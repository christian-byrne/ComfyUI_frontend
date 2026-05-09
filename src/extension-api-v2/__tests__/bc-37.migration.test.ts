// Category: BC.37 — VueNode bridge timing — deferred mount access
// DB cross-ref: S4.W5
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/load3d.ts
// blast_radius: 3.20
// compat-floor: blast_radius ≥ 2.0
// migration: waitForLoad3d polling pattern → NodeHandle.on('mounted', callback)

import { describe, it } from 'vitest'

describe('BC.37 migration — VueNode bridge timing (deferred mount access)', () => {
  describe('waitForLoad3d replacement', () => {
    it.todo(
      "waitForLoad3d(node, callback) is replaced by NodeHandle.on('mounted', callback) in v2"
    )
    it.todo(
      "v2 'mounted' fires via event system rather than polling; no setTimeout or setInterval needed"
    )
    it.todo(
      'v2 compat shim provides waitForLoad3d as a thin wrapper around NodeHandle.on(mounted) with a deprecation warning'
    )
  })

  describe('timing contract at nodeCreated', () => {
    it.todo(
      "code that previously ran in nodeCreated and expected DOM to be ready must move into the 'mounted' handler"
    )
    it.todo(
      'LiteGraph-side widget properties (value, callback, name) remain safe to read in nodeCreated without waiting'
    )
  })
})
