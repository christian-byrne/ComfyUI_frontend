// DB cross-ref: BC.40 — S17.FA1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.40 v1 — File upload and asset URL construction', () => {
  it.todo('app.handleFile(file) returns a promise that resolves with an object containing a { name, type } matching the uploaded file')
  it.todo('app.getPathImage(filename, type, subfolder) returns a URL string with the correct query parameters (?filename=, &type=, &subfolder=)')
  it.todo('a LoadImage node whose widget value is set to an uploaded filename produces a URL via app.getPathImage that points to the /view endpoint')
})
