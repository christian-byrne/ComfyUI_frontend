// DB cross-ref: BC.14 — S6.A1
// blast_radius: 46.66  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.14 v2 — Workflow → API serialization interception (graphToPrompt)', () => {
  it.todo('defineExtension setup can register a graphToPrompt hook that intercepts the API payload')
  it.todo('graphToPrompt hook receives the full prompt object before it is sent to the backend')
  it.todo('mutations made in the graphToPrompt hook are reflected in the payload dispatched to the server')
  it.todo('multiple extensions can each register a graphToPrompt hook and all are invoked in registration order')
})
