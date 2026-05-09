// DB cross-ref: BC.15 — S6.A2
// blast_radius: 20.31  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.15 v2 — Workflow loading into the editor', () => {
  it.todo('defineExtension setup can register a loadWorkflow hook that fires when a workflow JSON is loaded')
  it.todo('loadWorkflow hook receives the raw workflow object before nodes are instantiated')
  it.todo('mutations made in the loadWorkflow hook are reflected in the graph after loading completes')
})
