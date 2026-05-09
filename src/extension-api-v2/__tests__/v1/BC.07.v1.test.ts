// DB cross-ref: BC.07 — S2.N3,S2.N12,S2.N13
// blast_radius: 51.08  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.07 v1 — Connection observation, intercept, and veto', () => {
  it.todo('nodeType.prototype.onConnectInput is called before a link is established and can return false to veto')
  it.todo('nodeType.prototype.onConnectionsChange fires after a link is added or removed with updated slot info')
  it.todo('nodeType.prototype.onConnectOutput receives target node and slot and can veto the outgoing link')
  it.todo('vetoing a connection via onConnectInput prevents the link from appearing in graph.links')
})
