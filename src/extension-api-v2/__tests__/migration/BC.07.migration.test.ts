// DB cross-ref: BC.07 — S2.N3,S2.N12,S2.N13
// blast_radius: 51.08  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.07 migration — Connection observation, intercept, and veto', () => {
  it.todo('v1 nodeType.prototype.onConnectionsChange fires with the same (type, index, connected, linkInfo) args as v2 connectionChanged event')
  it.todo('v1 nodeType.prototype.onConnectInput returning false vetoes the connection identically to v2 connectInput returning false')
  it.todo('v1 nodeType.prototype.onConnectOutput returning false vetoes the connection identically to v2 connectOutput returning false')
  it.todo('v2 connectionChanged event fires once per connect and once per disconnect, matching v1 onConnectionsChange invocation parity')
})
