// Category: BC.01 — Node lifecycle: creation
// DB cross-ref: S2.N1, S2.N8
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/saveImageExtraOutput.ts#L31
// compat-floor: blast_radius 4.48 ≥ 2.0 — MUST pass before v2 ships
// Migration: v1 nodeCreated(node) + beforeRegisterNodeDef → v2 defineNodeExtension({ nodeCreated(handle) })

import { describe, it } from 'vitest'

describe('BC.01 migration — node lifecycle: creation', () => {
  describe('nodeCreated parity (S2.N1)', () => {
    it.todo(
      'v1 nodeCreated and v2 nodeCreated are both invoked the same number of times when N nodes are created'
    )
    it.todo(
      'side-effects applied to the node in v1 nodeCreated(node) are reproducible via NodeHandle methods in v2'
    )
    it.todo(
      'v2 nodeCreated fires in the same relative order as v1 for extensions registered in the same order'
    )
  })

  describe('beforeRegisterNodeDef → type-scoped defineNodeExtension (S2.N8)', () => {
    it.todo(
      'prototype mutation applied in v1 beforeRegisterNodeDef produces the same per-instance behavior as v2 type-scoped nodeCreated'
    )
    it.todo(
      'v2 type-scoped extension does not affect node types that were excluded, matching v1 type-guard behavior'
    )
  })

  describe('VueNode mount timing invariant', () => {
    it.todo(
      'both v1 and v2 nodeCreated fire before VueNode mounts — extensions relying on this ordering do not need changes'
    )
    it.todo(
      'extensions that deferred DOM work to a callback in v1 can use onNodeMounted in v2 for the same guarantee'
    )
  })
})
