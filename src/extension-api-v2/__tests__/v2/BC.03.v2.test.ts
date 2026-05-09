// DB cross-ref: BC.03 — S1.H1,S2.N7
// blast_radius: 15.42  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.03 v2 — Node lifecycle: hydration from saved workflows', () => {
  it.todo('defineNodeExtension loadedGraphNode callback is invoked when a workflow is loaded from JSON')
  it.todo('loadedGraphNode receives a NodeHandle whose widget values reflect the saved workflow state')
  it.todo('NodeHandle.on("configured", handler) fires after the node is hydrated from a saved graph')
})
