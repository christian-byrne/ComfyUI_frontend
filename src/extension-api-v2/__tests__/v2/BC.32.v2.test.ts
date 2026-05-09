// DB cross-ref: BC.32 — S16.VUE1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.32 v2 — Embedded framework runtimes and Vue widget bundling', () => {
  it.todo('v2 path for embedded Vue widget bundling is deferred — extensions must not bundle their own Vue runtime; the host-provided Vue instance is the intended integration point')
  it.todo('v2 path for embedded framework runtimes (React, Svelte) is deferred — no FrameworkBridge API exists yet in the v2 surface')
  it.todo('defineExtension shell SidebarTabExtension accepts a Vue component using the host Vue instance without bundling a second runtime')
})
