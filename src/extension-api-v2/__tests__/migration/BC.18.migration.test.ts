// DB cross-ref: BC.18 — S6.A3
// blast_radius: 22.74  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.18 migration — Backend HTTP calls', () => {
  it.todo('v1 api.fetchApi("/custom/endpoint", options) sends the same HTTP request as v2 useApiStore().fetch("/custom/endpoint", options)')
  it.todo('v1 api.fetchApi response object has the same shape (status, json(), text()) as the v2 fetch response')
  it.todo('authentication headers applied by v1 api.fetchApi are also applied by the v2 fetch API call')
})
