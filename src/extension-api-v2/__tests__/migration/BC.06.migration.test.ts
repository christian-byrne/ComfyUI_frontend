// DB cross-ref: BC.06 — S2.N9,S3.C1,S3.C2
// blast_radius: 58.97  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.06 migration — Custom canvas drawing (per-node and canvas-level)', () => {
  it.todo('v1 nodeType.prototype.onDrawForeground(ctx) receives the same CanvasRenderingContext2D as v2 drawForeground event.ctx')
  it.todo('draw calls made in v1 onDrawForeground appear at the same z-order as equivalent v2 drawForeground hook calls')
  it.todo('v1 LGraphCanvas.prototype.* monkey-patch override produces the same canvas-level rendering as the v2 canvas draw extension hook')
  it.todo('v2 canvas draw hook is invoked on every frame where v1 monkey-patch would have been called, with no missed frames')
})
