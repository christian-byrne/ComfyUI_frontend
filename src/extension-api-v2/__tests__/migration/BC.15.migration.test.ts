// DB cross-ref: BC.15 — S6.A2
// blast_radius: 20.31  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.15 migration — Workflow loading into the editor', () => {
  it.todo('v1 app.loadGraphData(workflowJson) populates the graph with the same nodes and links as v2 useWorkflowStore().loadWorkflow()')
  it.todo('loadedGraphNode hook fires after v1 app.loadGraphData completes, matching v2 post-load nodeConfigured event order')
  it.todo('v2 loadWorkflow API accepts the same workflow JSON shape as v1 app.loadGraphData without requiring format conversion')
})
