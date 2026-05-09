// DB cross-ref: BC.20 — S1.H5,S1.H6,S8.P1
// blast_radius: 27.49  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.20 v1 — Custom node-type registration (frontend-only / virtual)', () => {
  it.todo('app.registerExtension({ registerCustomNodes }) can call LiteGraph.registerNodeType to add a frontend-only node type')
  it.todo('a frontend-only node type registered via registerCustomNodes appears in the node search menu')
  it.todo('app.registerExtension({ getCustomWidgets }) returns widget factories that are available during beforeRegisterNodeDef')
  it.todo('custom node types registered with registerCustomNodes survive app.loadGraphData without being unregistered')
})
