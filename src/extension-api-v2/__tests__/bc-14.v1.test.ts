// Category: BC.14 — Workflow → API serialization interception (graphToPrompt)
// DB cross-ref: S6.A1
// Exemplar: https://github.com/Comfy-Org/ComfyUI-Manager/blob/main/js/components-manager.js#L781
// blast_radius: 7.02 (HIGHEST in dataset)
// compat-floor: blast_radius ≥ 2.0
// v1 contract: monkey-patch app.graphToPrompt — const orig = app.graphToPrompt.bind(app); app.graphToPrompt = async function(...args) { const r = await orig(...args); /* mutate r */ return r }
// v2 replacement: app.on('beforeGraphToPrompt', (payload) => { /* mutate payload */ }) event with cancellable/mutable payload

import { describe, it } from 'vitest'

describe('BC.14 v1 contract — graphToPrompt monkey-patch', () => {
  describe('S6.A1 — app.graphToPrompt interception', () => {
    it.todo(
      'extension can replace app.graphToPrompt with a wrapper that calls the original and returns the result'
    )
    it.todo(
      'wrapper receives the same positional arguments that the caller passed to app.graphToPrompt'
    )
    it.todo(
      'mutations to the resolved prompt object (output, workflow) are reflected in the final API payload'
    )
    it.todo(
      'virtual nodes resolved by the extension wrapper are absent from the serialized output sent to the backend'
    )
    it.todo(
      'custom metadata injected into prompt.output is preserved through the full queuePrompt call'
    )
    it.todo(
      'multiple extensions wrapping graphToPrompt in sequence each receive and pass through prior mutations'
    )
  })
})
