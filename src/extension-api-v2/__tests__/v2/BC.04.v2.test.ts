// DB cross-ref: BC.04 — S2.N10,S2.N17,S2.N19
// blast_radius: 38.07  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.04 v2 — Node interaction: pointer, selection, resize', () => {
  it.todo('NodeHandle.on("positionChanged", handler) fires with updated coordinates after node is moved')
  it.todo('NodeHandle.on("sizeChanged", handler) fires with new dimensions after node is resized')
  it.todo('NodeHandle.getPosition() returns current [x, y] after a position change event')
  it.todo('NodeHandle.getSize() returns current [width, height] after a size change event')
})
