// DB cross-ref: BC.27 — S9.R1,S9.G1,S9.L1,S9.S1
// blast_radius: 39.37  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.27 migration — LiteGraph entity direct manipulation (reroute, group, link, slot)', () => {
  it.todo('v1 LiteGraph.createRerouteOnLink() produces a reroute node with the same position and link connectivity as v2 graph.createReroute()')
  it.todo('v1 direct link.color mutation is reflected on the canvas identically to v2 link style API call')
  it.todo('v1 graph.groups array mutation (add/remove LGraphGroup) produces the same serialized group list as v2 group management API')
  it.todo('v1 slot type string read from node.inputs[i].type matches v2 node.getInputInfo(i).type for all built-in and custom types')
})
