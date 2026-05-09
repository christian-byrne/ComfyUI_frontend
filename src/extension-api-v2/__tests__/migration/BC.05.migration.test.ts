// DB cross-ref: BC.05 — S4.W2,S2.N11
// blast_radius: 33.35  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.05 migration — Custom DOM widgets and node sizing', () => {
  it.todo('v1 node.addDOMWidget(name, type, element, options) produces a widget with the same DOM element reference accessible via v2 widget.element')
  it.todo('v1 nodeType.prototype.computeSize override returns the same [width, height] as v2 computeSize hook for the same node content')
  it.todo('DOM widget created via v1 addDOMWidget is visible and positioned identically to a v2 addDOMWidget call with equivalent options')
  it.todo('node auto-resizes to fit DOM widget in both v1 and v2 paths when options.hideOnZoom is false')
})
