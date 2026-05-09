// DB cross-ref: BC.35 — S6.A5
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.35 migration — Pre-queue widget validation', () => {
  it.todo('v1 validation hook returning an error string prevents queue submission identically to v2 beforeQueuePrompt event.preventDefault()')
  it.todo('v2 validation hook receives the same widget value and node reference as v1 for the same workflow state')
  it.todo('error surfaced to user from v1 pre-queue validation is displayed with the same severity/message as v2 validation error toast')
})
