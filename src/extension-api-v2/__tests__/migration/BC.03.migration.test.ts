// DB cross-ref: BC.03 — S1.H1,S2.N7
// blast_radius: 15.42  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.03 migration — Node lifecycle: hydration from saved workflows', () => {
  it.todo('v1 ComfyExtension.loadedGraphNode is called with the same node instance as v2 defineNodeExtension nodeConfigured')
  it.todo('v1 nodeType.prototype.onConfigure receives the same serialized data object as v2 nodeConfigured event.data')
  it.todo('v2 nodeConfigured fires after all widget values are restored, matching v1 onConfigure timing')
  it.todo('state mutations applied in v1 loadedGraphNode produce the same visible node state as equivalent v2 nodeConfigured mutations')
})
