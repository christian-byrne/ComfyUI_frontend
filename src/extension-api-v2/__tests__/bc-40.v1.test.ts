// Category: BC.40 — File upload and asset URL construction
// DB cross-ref: S17.FA1
// Exemplar: https://www.notion.so/comfy-org/Develop-a-custom-node-from-scratch-pain-point-assessment-33c6d73d365080f49126c0b5affa7559
// blast_radius: 0.0
// compat-floor: NO (absent API gap — out of scope for @comfyorg/extension-api;
//               belongs in future @comfyorg/comfy-api package)
// v1 contract: each extension manually builds FormData, calls api.fetchApi('/upload/image', ...),
//              constructs /view?filename=... URL
// Note: 32+ packages affected; 9 implement video upload variants.
//       Upload timeout hardcoded 120s; large 3D/video fail silently. No temp file lifecycle.

import { describe, it } from 'vitest'

describe('BC.40 v1 contract — file upload and asset URL construction', () => {
  describe('S17.FA1 — manual FormData and fetchApi upload', () => {
    it.todo(
      'extension constructs a FormData with file, filename, subfolder, and type fields manually'
    )
    it.todo(
      "extension calls api.fetchApi('/upload/image', { method: 'POST', body: formData }) to upload"
    )
    it.todo(
      'upload response JSON contains filename, subfolder, and type fields for URL construction'
    )
    it.todo(
      'upload timeout is hardcoded to 120s; uploads of large 3D or video files silently fail at that limit'
    )
  })

  describe('S17.FA1 — manual /view URL construction', () => {
    it.todo(
      "extension constructs the retrieval URL as '/view?filename=...&type=...&subfolder=...' from upload response fields"
    )
    it.todo(
      '32+ packages each duplicate this URL construction pattern with slight variations, causing inconsistencies'
    )
  })
})
