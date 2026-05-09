// DB cross-ref: BC.38 — S17.AM1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.38 v2 — Canvas mode observation', () => {
  it.todo('defineExtension setup context exposes a canvas mode observable that emits the current interaction mode without direct LiteGraph access')
  it.todo('NodeHandle.on("modeChanged") fires when canvas switches between normal, bypass, and mute modes affecting a given node')
  it.todo('canvas mode changes are observable via v2 setup context without polling window.LiteGraph.CANVAS_MODE')
})
