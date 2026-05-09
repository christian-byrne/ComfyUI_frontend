// Category: BC.27 — LiteGraph entity direct manipulation (reroute, group, link, slot)
// DB cross-ref: S9.R1, S9.G1, S9.L1, S9.S1
// Exemplar: https://github.com/nodetool-ai/nodetool/blob/main/subgraphs.md#L1
// blast_radius: 5.62
// compat-floor: blast_radius ≥ 2.0
// migration: direct raw object mutations → read-only v2 accessors (mutations deferred to D9 Phase C)

import { describe, it } from 'vitest'

describe('BC.27 migration — LiteGraph entity direct manipulation', () => {
  describe('reroute migration', () => {
    it.todo(
      'v1 graph.reroutes raw access is replaced by comfyApp.graph.reroutes iterable'
    )
    it.todo(
      'v1 direct position mutation (graph.reroutes[id].pos = [...]) has no v2 equivalent until D9 Phase C'
    )
  })

  describe('group migration', () => {
    it.todo(
      'v1 graph.groups[i].title mutation is replaced by a future GroupHandle.setTitle() (D9 Phase C)'
    )
    it.todo(
      'v1 graph.groups iteration is replaced by comfyApp.graph.groups read-only iterable'
    )
  })

  describe('link migration', () => {
    it.todo(
      'v1 link.color direct assignment is replaced by a future LinkHandle.setColor() (D9 Phase C)'
    )
    it.todo(
      'v2 compat shim logs a deprecation warning when graph.links is accessed directly'
    )
  })

  describe('slot migration', () => {
    it.todo(
      'v1 node.inputs[i].shape mutation has no v2 equivalent until D9 Phase C'
    )
    it.todo(
      'v2 compat shim throws a TypeError when slot mutation is attempted via legacy path'
    )
  })
})
