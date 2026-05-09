// DB cross-ref: BC.18 — S6.A3
// blast_radius: 22.74  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.18 v1 — Backend HTTP calls', () => {
  it.todo('api.fetchApi(route, options) resolves with a Response object for a successful GET to a ComfyUI endpoint')
  it.todo('api.fetchApi correctly prefixes the configured api_base so relative routes resolve against the server origin')
  it.todo('extensions can use api.fetchApi inside beforeRegisterNodeDef to pre-fetch model lists before nodes are registered')
})
