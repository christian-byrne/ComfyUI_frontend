// DB cross-ref: BC.05 — S4.W2,S2.N11
// blast_radius: 33.35  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.05 v1 — Custom DOM widgets and node sizing', () => {
  it.todo('node.addDOMWidget(name, type, element) mounts an HTMLElement inside the node body on the canvas')
  it.todo('custom DOM widget reports its measured height back to LiteGraph so node.size updates correctly')
  it.todo('nodeType.prototype.computeSize override controls node dimensions when DOM widgets are present')
  it.todo('DOM widget element is removed from the canvas container when the node is removed')
})
