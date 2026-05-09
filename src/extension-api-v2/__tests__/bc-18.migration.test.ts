// Category: BC.18 — Backend HTTP calls
// DB cross-ref: S6.A3
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/components/common/BackgroundImageUpload.vue#L61
// blast_radius: 5.77 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// Migration: v1 app.api.fetchApi → v2 comfyAPI.fetchApi (same signature, stable import)

import { describe, it } from 'vitest'

describe('BC.18 migration — backend HTTP calls', () => {
  describe('request equivalence', () => {
    it.todo(
      'v1 app.api.fetchApi(path, init) and v2 comfyAPI.fetchApi(path, init) send identical HTTP requests to the backend'
    )
    it.todo(
      'authentication headers attached by v1 and v2 are equivalent; the backend accepts both without reconfiguration'
    )
    it.todo(
      'FormData uploads via v1 and v2 produce the same multipart body on the wire'
    )
  })

  describe('response handling equivalence', () => {
    it.todo(
      'v1 and v2 both return a native Response object; callers can use .json(), .text(), and .ok identically'
    )
    it.todo(
      '4xx/5xx responses resolve (not reject) in both v1 and v2, so existing error-check patterns remain valid'
    )
  })

  describe('import path migration', () => {
    it.todo(
      'replacing "app.api.fetchApi" with an import of comfyAPI.fetchApi requires no call-site argument changes'
    )
    it.todo(
      'comfyAPI.fetchApi is available at extension init time without waiting for app.setup() to complete'
    )
  })
})
