// DB cross-ref: BC.22 — S2.N5,S1.H3,S1.H4
// blast_radius: 19.53  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.22 v1 — Context menu contributions (node and canvas)', () => {
  it.todo('app.registerExtension({ getNodeMenuOptions }) receives (node, options) and can push entries into the options array')
  it.todo('app.registerExtension({ getCanvasMenuOptions }) receives (options) and can push entries for canvas right-click menu')
  it.todo('menu entries pushed via addCustomMenuEntries are rendered in the LiteGraph context menu without error')
  it.todo('returning null or undefined from getNodeMenuOptions does not suppress the default node menu')
})
