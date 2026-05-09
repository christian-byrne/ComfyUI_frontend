// DB cross-ref: BC.37 — S4.W5
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.37 migration — VueNode bridge timing — deferred mount access', () => {
  it.todo('v1 widget.value write inside nodeCreated completes before the component renders; v2 equivalent using onMounted deferred write produces the same initial state')
  it.todo('v2 VueNode component instance is accessible to external code after the nextTick following nodeCreated, matching v1 synchronous widget access timing')
  it.todo('v1 Three.js renderer reference stored on widget survives the nodeCreated → first-draw cycle identically to v2 VueNode expose() ref access')
})
