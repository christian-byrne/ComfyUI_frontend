// Category: BC.03 — Node lifecycle: hydration from saved workflows
// DB cross-ref: S1.H1, S2.N7
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/extensions/core/
// compat-floor: blast_radius 4.91 ≥ 2.0 — MUST pass before v2 ships
// Migration: v1 node.onConfigure / beforeRegisterNodeDef → v2 defineNodeExtension({ onConfigure(handle, data) })

import { describe, it } from 'vitest'

describe('BC.03 migration — node lifecycle: hydration from saved workflows', () => {
  describe('onConfigure parity (S2.N7)', () => {
    it.todo(
      'v1 node.onConfigure and v2 onConfigure are both called exactly once per node during workflow load'
    )
    it.todo(
      'the serialized data object received in v2 onConfigure contains the same fields as in v1'
    )
    it.todo(
      'custom property restoration logic written for v1 onConfigure is portable to v2 with only handle substitution'
    )
  })

  describe('beforeRegisterNodeDef hydration guard → type-scoped extension (S1.H1)', () => {
    it.todo(
      'prototype-level onConfigure injected via v1 beforeRegisterNodeDef produces the same hydration result as a v2 type-scoped onConfigure'
    )
    it.todo(
      'v2 type-scoped onConfigure does not fire for node types not listed in types:, matching v1 guard behavior'
    )
  })

  describe('fresh-creation exclusion invariant', () => {
    it.todo(
      'neither v1 nor v2 onConfigure fires when a node is created fresh (not from a saved workflow)'
    )
  })
})
