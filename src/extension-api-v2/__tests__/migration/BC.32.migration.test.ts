// DB cross-ref: BC.32 — S16.VUE1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.32 migration — Embedded framework runtimes and Vue widget bundling', () => {
  it.todo('v1 DOM widget with bundled Vue app mounted via createApp() renders the same UI as a v2 VueNode widget using the host Vue instance')
  it.todo('v2 VueNode component receives the same initial props as a v1 bundled-Vue widget receives through its DOM element dataset')
  it.todo('reactive state updates inside a v2 VueNode widget are reflected in the DOM with the same latency as a v1 bundled Vue component')
})
