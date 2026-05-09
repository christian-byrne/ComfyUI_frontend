// DB cross-ref: BC.26 — S7.G1
// blast_radius: 27.0  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.26 v1 — Globals as ABI (window.LiteGraph, window.comfyAPI)', () => {
  it.todo('window.LiteGraph is defined and exposes LiteGraph.NODE_TITLE_HEIGHT and LiteGraph.registerNodeType')
  it.todo('window.comfyAPI is defined and exposes at minimum { app, widgets, logging } namespaces used by v1 extensions')
  it.todo('prototype properties added to window.LiteGraph.LGraphNode.prototype are present on all subsequently created node instances')
  it.todo('window.app is the same reference as the module-level app singleton imported by the frontend')
})
