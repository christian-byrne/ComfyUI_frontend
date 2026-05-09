// Category: BC.35 — Pre-queue widget validation
// DB cross-ref: S6.A5
// Exemplar: https://github.com/goodtab/ComfyUI-Custom-Scripts
// blast_radius: 3.10
// compat-floor: blast_radius ≥ 2.0
// v1 contract: monkey-patch app.queuePrompt and throw or return early if validation fails
//              (breaks other queuePrompt patchers — silent_breakage=true)

import { describe, it } from 'vitest'

describe('BC.35 v1 contract — pre-queue widget validation', () => {
  describe('S6.A5 — queuePrompt monkey-patching', () => {
    it.todo(
      'extension can replace app.queuePrompt with a wrapper that inspects widget values before delegating'
    )
    it.todo(
      'throwing inside the monkey-patched queuePrompt prevents the workflow from being submitted'
    )
    it.todo(
      'returning early (undefined) inside the monkey-patched queuePrompt also cancels submission'
    )
    it.todo(
      'two extensions both monkey-patching app.queuePrompt result in only the last patcher running (silent breakage)'
    )
  })

  describe('S6.A5 — error surfacing limitations', () => {
    it.todo(
      'a thrown error in the monkey-patched queuePrompt is not displayed in the ComfyUI UI — it lands in the console only'
    )
    it.todo(
      'there is no standard mechanism in v1 to surface a validation error message to the user from queuePrompt'
    )
  })
})
