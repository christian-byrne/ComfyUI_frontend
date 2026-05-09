// DB cross-ref: BC.26 — S7.G1
// blast_radius: 27.0  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.26 migration — Globals as ABI (window.LiteGraph, window.comfyAPI)', () => {
  it.todo('window.LiteGraph enum values (LiteGraph.INPUT, LiteGraph.OUTPUT, etc.) match the values exported from the v2 litegraph module import')
  it.todo('window.comfyAPI.* module references resolve to the same objects as the corresponding v2 named imports from the extension API')
  it.todo('extensions reading window.LiteGraph.registered_node_types see the same node registry as v2 useNodeDefStore().nodeTypes')
  it.todo('v2 API module exports cover all window.comfyAPI surface area accessed by v1 extensions so globals can be dropped without behavior change')
})
