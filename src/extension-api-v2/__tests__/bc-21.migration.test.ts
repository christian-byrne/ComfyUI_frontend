// Category: BC.21 — Custom widget-type registration
// DB cross-ref: S1.H2
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/
// blast_radius: 4.32
// compat-floor: blast_radius ≥ 2.0
// Migration: v1 getCustomWidgets factory → v2 defineWidgetExtension

import { describe, it } from 'vitest'

describe('BC.21 migration — Custom widget-type registration', () => {
  describe('factory invocation parity (S1.H2)', () => {
    it.todo(
      'v1 factory (node, inputData, app) and v2 create(handle, inputData) both receive equivalent inputData for the same node def'
    )
    it.todo(
      'widget produced by v1 factory and v2 create have identical serialized value in node.widgets after creation'
    )
  })

  describe('registration timing', () => {
    it.todo(
      'v1 getCustomWidgets fires during extension setup; v2 defineWidgetExtension registers before setup completes — both resolve before nodeCreated'
    )
  })

  describe('scope cleanup on dispose', () => {
    it.todo(
      'v1 custom widget type persists after extension unregisters; v2 type is unregistered and nodes fall back to default rendering'
    )
    it.todo(
      'v2 cleanup on dispose does not affect widget types registered by other extensions'
    )
  })
})
