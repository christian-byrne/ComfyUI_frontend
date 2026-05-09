// Category: BC.27 — LiteGraph entity direct manipulation (reroute, group, link, slot)
// DB cross-ref: S9.R1, S9.G1, S9.L1, S9.S1
// Exemplar: https://github.com/nodetool-ai/nodetool/blob/main/subgraphs.md#L1
// blast_radius: 5.62
// compat-floor: blast_radius ≥ 2.0
// v2 contract: partial — reroute/group/link read APIs planned; mutations deferred to D9 Phase C.
//              For now: read-only accessors

import { describe, it } from 'vitest'

describe('BC.27 v2 contract — LiteGraph entity direct manipulation', () => {
  describe('S9.R1 — reroute read-only accessors', () => {
    it.todo(
      'comfyApp.graph.reroutes returns an iterable of read-only RerouteHandle objects'
    )
    it.todo(
      'RerouteHandle exposes id, pos, and linked link IDs as read-only properties'
    )
    it.todo(
      'attempting to mutate RerouteHandle.pos in v2 throws or is silently ignored (write-protect)'
    )
  })

  describe('S9.G1 — group read-only accessors', () => {
    it.todo(
      'comfyApp.graph.groups returns an iterable of read-only GroupHandle objects'
    )
    it.todo(
      'GroupHandle exposes title and bounding as read-only (mutations deferred to D9 Phase C)'
    )
  })

  describe('S9.L1 — link read-only accessors', () => {
    it.todo(
      'comfyApp.graph.links returns a Map<id, LinkHandle> with read-only color and type'
    )
    it.todo(
      'link mutation API is not available in v2 Phase A (deferred to D9 Phase C)'
    )
  })

  describe('S9.S1 — slot read-only accessors', () => {
    it.todo(
      'NodeHandle.inputs and NodeHandle.outputs expose read-only SlotHandle with shape'
    )
    it.todo(
      'slot shape mutation is not available in v2 Phase A (deferred to D9 Phase C)'
    )
  })
})
