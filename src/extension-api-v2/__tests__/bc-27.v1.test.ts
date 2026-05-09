// Category: BC.27 — LiteGraph entity direct manipulation (reroute, group, link, slot)
// DB cross-ref: S9.R1, S9.G1, S9.L1, S9.S1
// Exemplar: https://github.com/nodetool-ai/nodetool/blob/main/subgraphs.md#L1
// blast_radius: 5.62
// compat-floor: blast_radius ≥ 2.0
// v1 contract: direct graph.reroutes, graph.groups, link.color, slot.shape mutations — no API, raw object access

import { describe, it } from 'vitest'

describe('BC.27 v1 contract — LiteGraph entity direct manipulation', () => {
  describe('S9.R1 — reroute direct access', () => {
    it.todo(
      'extension can read graph.reroutes and iterate all reroute nodes in the graph'
    )
    it.todo(
      'extension can mutate reroute position directly via graph.reroutes[id].pos'
    )
    it.todo(
      'reroute additions via graph.reroutes[id] = { ... } are reflected in the rendered canvas'
    )
  })

  describe('S9.G1 — group direct access', () => {
    it.todo(
      'extension can read graph.groups and iterate all groups'
    )
    it.todo(
      'extension can mutate group title via graph.groups[i].title = string'
    )
    it.todo(
      'extension can mutate group bounding box via graph.groups[i].bounding'
    )
  })

  describe('S9.L1 — link direct access', () => {
    it.todo(
      'extension can read link.color and link.type directly from graph.links[id]'
    )
    it.todo(
      'setting link.color mutates the rendered link color without requiring graph refresh'
    )
  })

  describe('S9.S1 — slot direct access', () => {
    it.todo(
      'extension can read node.inputs[i].shape and node.outputs[i].shape directly'
    )
    it.todo(
      'extension can mutate slot.shape to change rendered connector shape'
    )
  })
})
