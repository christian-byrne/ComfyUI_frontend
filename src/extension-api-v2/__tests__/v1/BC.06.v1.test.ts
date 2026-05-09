// DB cross-ref: BC.06 — S2.N9,S3.C1,S3.C2
// blast_radius: 58.97  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.06 v1 — Custom canvas drawing (per-node and canvas-level)', () => {
  it.todo('nodeType.prototype.onDrawBackground is called with the CanvasRenderingContext2D during each canvas repaint')
  it.todo('nodeType.prototype.onDrawForeground is called after node content and widgets are drawn')
  it.todo('app.registerExtension({ drawBackground }) canvas-level hook receives ctx and visible graph area')
  it.todo('extension drawForeground hook fires after all nodes are painted, allowing overlay decorations')
})
