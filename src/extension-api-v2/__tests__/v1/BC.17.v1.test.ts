// DB cross-ref: BC.17 — S5.A1,S5.A2,S5.A3
// blast_radius: 51.25  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.17 v1 — Backend execution lifecycle and progress events', () => {
  it.todo('app.registerExtension({ init }) callback can attach listeners to api.addEventListener("status", ...) for queue state')
  it.todo('api.addEventListener("progress", handler) fires with { value, max, prompt_id, node } during execution')
  it.todo('api.addEventListener("executed", handler) fires after each node completes with its output data')
  it.todo('api.addEventListener("execution_error", handler) fires with error details when the backend aborts')
})
