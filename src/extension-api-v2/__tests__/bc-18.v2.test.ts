// Category: BC.18 — Backend HTTP calls
// DB cross-ref: S6.A3
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/components/common/BackgroundImageUpload.vue#L61
// blast_radius: 5.77 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// v2 replacement: comfyAPI.fetchApi(path, opts) — same signature, same authentication, stable import path

import { describe, it } from 'vitest'

describe('BC.18 v2 contract — comfyAPI.fetchApi', () => {
  describe('API surface stability', () => {
    it.todo(
      'comfyAPI.fetchApi(path, init) is importable from the stable extension-api-v2 package without accessing app.api'
    )
    it.todo(
      'comfyAPI.fetchApi signature is identical to v1 app.api.fetchApi: (path: string, init?: RequestInit) => Promise<Response>'
    )
    it.todo(
      'comfyAPI.fetchApi uses the same base URL and authentication mechanism as v1 fetchApi'
    )
  })

  describe('request handling', () => {
    it.todo(
      'POST with FormData body is forwarded correctly, preserving multipart boundary'
    )
    it.todo(
      'JSON body with explicit Content-Type: application/json is sent without modification'
    )
    it.todo(
      'non-2xx responses resolve (not reject) the returned Promise, consistent with v1 behaviour'
    )
  })

  describe('extension isolation', () => {
    it.todo(
      'comfyAPI.fetchApi does not expose session credentials in a way that allows cross-extension credential theft'
    )
  })
})
