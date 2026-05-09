// DB cross-ref: BC.20 — S1.H5,S1.H6,S8.P1
// blast_radius: 27.49  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.20 migration — Custom node-type registration (frontend-only / virtual)', () => {
  it.todo('v1 ComfyExtension.addCustomNodeDefs registers node types visible to getNodeDefs() identically to v2 registerNodeType()')
  it.todo('v1 ComfyExtension.registerCustomNodes callback runs at the same registration phase as v2 app.registerExtension nodeRegistered hook')
  it.todo('v1 nodeType.prototype.isVirtualNode = true causes the node to be stripped from API payload identically to v2 isVirtualNode declaration')
  it.todo('frontend-only node registered in v1 addCustomNodeDefs can be instantiated, serialized, and rehydrated identically to a v2 virtual node')
})
