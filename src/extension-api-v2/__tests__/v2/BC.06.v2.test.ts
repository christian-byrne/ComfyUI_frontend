// DB cross-ref: BC.06 — S2.N9,S3.C1,S3.C2
// blast_radius: 58.97  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.06 v2 — Custom canvas drawing (per-node and canvas-level)', () => {
  it.todo('defineNodeExtension nodeCreated can register a per-node draw callback via NodeHandle')
  it.todo('defineExtension setup can register a canvas-level draw callback that fires each render frame')
  it.todo('canvas-level draw callback receives a CanvasRenderingContext2D or equivalent drawing context')
  it.todo('per-node draw callback is not invoked for nodes that belong to a different extension')
})
