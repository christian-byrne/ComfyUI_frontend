// DB cross-ref: BC.15 — S6.A2
// blast_radius: 20.31  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.15 v1 — Workflow loading into the editor', () => {
  it.todo('app.loadGraphData(graph) triggers app.registerExtension({ loadedGraphNode }) for every node in the workflow')
  it.todo('extension loadedGraphNode callback can mutate node properties after hydration without breaking subsequent nodes')
  it.todo('loading a workflow with unknown node types does not throw and leaves placeholder nodes intact')
})
