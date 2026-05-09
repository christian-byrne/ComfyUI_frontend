// DB cross-ref: BC.04 — S2.N10,S2.N17,S2.N19
// blast_radius: 38.07  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.04 migration — Node interaction: pointer, selection, resize', () => {
  it.todo('v1 nodeType.prototype.onMouseDown receives the same event coordinates as v2 pointerDown event argument')
  it.todo('v1 nodeType.prototype.onSelected / onDeselected fire in the same order as v2 nodeSelected / nodeDeselected events')
  it.todo('v1 nodeType.prototype.onResize provides the same new-size value as v2 nodeResized event.size')
  it.todo('returning false in v1 onMouseDown to suppress default behavior is equivalent to v2 event.preventDefault()')
})
