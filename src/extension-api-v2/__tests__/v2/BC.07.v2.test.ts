// DB cross-ref: BC.07 — S2.N3,S2.N12,S2.N13
// blast_radius: 51.08  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.07 v2 — Connection observation, intercept, and veto', () => {
  it.todo('NodeHandle.on("connected", handler) fires with slot index and connected node info when a link is made')
  it.todo('NodeHandle.on("disconnected", handler) fires with slot index when a link is removed')
  it.todo('connection intercept callback can return false to veto an incoming connection')
  it.todo('connection veto does not fire the "connected" event on the target NodeHandle')
})
