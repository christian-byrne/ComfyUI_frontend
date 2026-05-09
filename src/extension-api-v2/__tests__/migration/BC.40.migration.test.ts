// DB cross-ref: BC.40 — S17.FA1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.40 migration — File upload and asset URL construction', () => {
  it.todo('v1 api.fetchApi("/upload/image", {method:"POST", body: formData}) uploads a file to the same backend path as v2 useFileStore().uploadFile()')
  it.todo('asset URL constructed manually as "/view?filename=...&type=input" in v1 matches the URL returned by v2 useFileStore().getAssetUrl()')
  it.todo('v2 uploadFile() resolves with the same {name, subfolder, type} shape as the v1 manual upload JSON response parse')
})
