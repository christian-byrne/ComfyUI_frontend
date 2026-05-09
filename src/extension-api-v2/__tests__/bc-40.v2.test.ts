// Category: BC.40 — File upload and asset URL construction
// DB cross-ref: S17.FA1
// Exemplar: https://www.notion.so/comfy-org/Develop-a-custom-node-from-scratch-pain-point-assessment-33c6d73d365080f49126c0b5affa7559
// blast_radius: 0.0
// compat-floor: NO (absent API gap — future @comfyorg/comfy-api package, not @comfyorg/extension-api)
// v2 contract: comfyAPI.uploadFile(file, { subfolder, type }) + comfyAPI.getFileUrl(filename, type, subfolder)

import { describe, it } from 'vitest'

describe('BC.40 v2 contract — file upload and asset URL construction', () => {
  describe('S17.FA1 — comfyAPI.uploadFile', () => {
    it.todo(
      'comfyAPI.uploadFile(file, { subfolder, type }) returns a promise resolving to UploadResult'
    )
    it.todo(
      'UploadResult contains filename, subfolder, and type fields matching the server response'
    )
    it.todo(
      'comfyAPI.uploadFile accepts an optional timeout option, overriding the hardcoded 120s default'
    )
    it.todo(
      'upload failure (network error or server error) rejects the promise with a typed UploadError'
    )
  })

  describe('S17.FA1 — comfyAPI.getFileUrl', () => {
    it.todo(
      'comfyAPI.getFileUrl(filename, type, subfolder) returns the canonical /view?... URL string'
    )
    it.todo(
      'getFileUrl with an UploadResult spread produces the same URL as calling it with individual fields'
    )
    it.todo(
      'comfyAPI.getFileUrl is scoped to @comfyorg/comfy-api, not @comfyorg/extension-api'
    )
  })
})
