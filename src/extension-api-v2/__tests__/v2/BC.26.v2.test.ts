// DB cross-ref: BC.26 — S7.G1
// blast_radius: 27.0  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.26 v2 — Globals as ABI (window.LiteGraph, window.comfyAPI)', () => {
  it.todo('v2 extensions obtain graph access through defineExtension setup context, not window.LiteGraph')
  it.todo('defineExtension init callback receives an api context object that replaces direct window.comfyAPI access')
  it.todo('NodeHandle.entityId provides a stable identity without requiring window.LiteGraph node reference')
  it.todo('v2 extension registered via defineExtension does not need to read window globals to function correctly')
})
