// DB cross-ref: BC.17 — S5.A1,S5.A2,S5.A3
// blast_radius: 51.25  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.17 migration — Backend execution lifecycle and progress events', () => {
  it.todo('v1 api.addEventListener("execution_start", handler) fires at the same execution phase as v2 useExecutionStore onExecutionStart hook')
  it.todo('v1 api.addEventListener("progress", handler) receives the same {value, max, node} payload as v2 executionProgress event')
  it.todo('v1 api.addEventListener("execution_success", handler) fires at the same time as v2 onExecutionComplete and with equivalent prompt_id')
  it.todo('v2 execution lifecycle events cover all v1 event names (execution_start, execution_success, execution_error, progress) with no gaps')
})
