// DB cross-ref: BC.27 — S9.R1,S9.G1,S9.L1,S9.S1
// blast_radius: 39.37  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.27 v1 — LiteGraph entity direct manipulation (reroute, group, link, slot)', () => {
  it.todo('directly setting node.pos[0] and node.pos[1] moves the node and is reflected in graph.serialize()')
  it.todo('graph.addGroup() creates a LGraphGroup whose title and bounding box are mutable via direct property assignment')
  it.todo('a link object retrieved from graph.links[id] exposes { id, origin_id, origin_slot, target_id, target_slot, type } matching v1 shape')
  it.todo('adding a reroute node via LiteGraph.createNode("Reroute") and connecting slots through it does not break link serialization')
})
