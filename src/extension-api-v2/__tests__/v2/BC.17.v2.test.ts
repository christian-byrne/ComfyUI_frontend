// DB cross-ref: BC.17 — S5.A1,S5.A2,S5.A3
// blast_radius: 51.25  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.17 v2 — Backend execution lifecycle and progress events', () => {
  it.todo('defineExtension setup can register an executionStart hook that fires when a queue run begins')
  it.todo('defineExtension setup can register an executionComplete hook that fires when a run finishes')
  it.todo('progress event handler receives a fraction (0–1) and the currently executing node id')
  it.todo('executionError hook fires with an error descriptor when the backend reports a failure')
})
