// DB cross-ref: BC.14 — S6.A1
// blast_radius: 46.66  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.14 migration — Workflow → API serialization interception (graphToPrompt)', () => {
  it.todo('v1 app.graphToPrompt monkey-patch that mutates output.workflow produces the same modified workflow as v2 beforeGraphToPrompt event mutation')
  it.todo('v1 app.graphToPrompt monkey-patch that mutates output.output (API payload) produces the same API JSON as v2 beforeQueuePrompt event mutation')
  it.todo('v2 beforeGraphToPrompt fires exactly once per queue action, matching v1 monkey-patch interception frequency')
  it.todo('virtual nodes resolved in v1 graphToPrompt override are absent from the final API payload identically to v2 virtual node resolution hook')
})
