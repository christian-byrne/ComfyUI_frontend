// Category: BC.19 — Workflow execution trigger
// DB cross-ref: S6.A4
// Exemplar: https://github.com/MajoorWaldi/ComfyUI-Majoor-AssetsManager/blob/main/js/features/viewer/workflowSidebar/sidebarRunButton.js#L317
// blast_radius: 6.09 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// v1 contract: monkey-patch app.queuePrompt — const orig = app.queuePrompt.bind(app); app.queuePrompt = async function(num, batchCount) { /* mutate */ return orig(num, batchCount) }

import { describe, it } from 'vitest'

describe('BC.19 v1 contract — app.queuePrompt monkey-patch', () => {
  describe('S6.A4 — queuePrompt interception', () => {
    it.todo(
      'extension can replace app.queuePrompt with a wrapper that calls the original and returns its result'
    )
    it.todo(
      'wrapper receives (number, batchCount) arguments matching the internal call signature'
    )
    it.todo(
      'extension can inject an auth token or extra field into the prompt payload before delegating to orig()'
    )
    it.todo(
      'extension can prevent execution by not calling orig() inside the wrapper'
    )
    it.todo(
      'multiple extensions wrapping queuePrompt in sequence each execute in wrapping order'
    )
    it.todo(
      'programmatic call to app.queuePrompt(0, 1) from an extension correctly enqueues the current graph'
    )
  })
})
