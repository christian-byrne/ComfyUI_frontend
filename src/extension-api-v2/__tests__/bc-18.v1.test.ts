// Category: BC.18 — Backend HTTP calls
// DB cross-ref: S6.A3
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/components/common/BackgroundImageUpload.vue#L61
// blast_radius: 5.77 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// v1 contract: app.api.fetchApi('/endpoint', { method: 'POST', body: ... })

import { describe, it } from 'vitest'

describe('BC.18 v1 contract — app.api.fetchApi', () => {
  describe('S6.A3 — authenticated HTTP calls via fetchApi', () => {
    it.todo(
      'app.api.fetchApi(path, init) returns a Promise<Response> from the ComfyUI backend origin'
    )
    it.todo(
      'fetchApi prepends the configured base URL so callers use relative paths like "/upload/image"'
    )
    it.todo(
      'fetchApi includes authentication headers (e.g. session cookie or Authorization) automatically'
    )
    it.todo(
      'a POST call with a FormData body is forwarded without Content-Type override, allowing multipart to work'
    )
    it.todo(
      'a non-2xx response from the backend is returned as a resolved Promise (not rejected); callers must check response.ok'
    )
    it.todo(
      'concurrent fetchApi calls from different extensions do not share or corrupt each other\'s request state'
    )
  })
})
