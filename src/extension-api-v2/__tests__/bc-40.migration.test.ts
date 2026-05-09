// Category: BC.40 — File upload and asset URL construction
// DB cross-ref: S17.FA1
// Exemplar: https://www.notion.so/comfy-org/Develop-a-custom-node-from-scratch-pain-point-assessment-33c6d73d365080f49126c0b5affa7559
// blast_radius: 0.0
// compat-floor: NO (absent API gap — migration from manual FormData pattern to comfyAPI helpers)
// migration: manual api.fetchApi('/upload/image') + URL string construction → comfyAPI.uploadFile + getFileUrl

import { describe, it } from 'vitest'

describe('BC.40 migration — file upload and asset URL construction', () => {
  describe('upload migration', () => {
    it.todo(
      "manual FormData construction + api.fetchApi('/upload/image') is replaced by comfyAPI.uploadFile(file, opts)"
    )
    it.todo(
      'extensions with hardcoded 120s timeout should pass an explicit timeout option to comfyAPI.uploadFile'
    )
    it.todo(
      'video upload variants (9 packages) can use the same comfyAPI.uploadFile with type: "video" option'
    )
  })

  describe('URL construction migration', () => {
    it.todo(
      "manual '/view?filename=...' string assembly is replaced by comfyAPI.getFileUrl(filename, type, subfolder)"
    )
    it.todo(
      'extensions that spread UploadResult directly into getFileUrl reduce URL construction to a single call'
    )
  })

  describe('package boundary', () => {
    it.todo(
      'comfyAPI.uploadFile and getFileUrl are imported from @comfyorg/comfy-api, not @comfyorg/extension-api'
    )
    it.todo(
      'migration is blocked until @comfyorg/comfy-api package ships; extensions must retain v1 pattern until then'
    )
  })
})
