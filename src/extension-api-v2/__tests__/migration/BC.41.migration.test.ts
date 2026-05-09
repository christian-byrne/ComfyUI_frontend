// DB cross-ref: BC.41 — S17.WV1
// blast_radius: 4.09  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.41 migration — Widget values positional serialization fragility', () => {
  it.todo('v1 widgets_values positional array round-trips correctly when deserialized via v2 loadWorkflow() without index shifting')
  it.todo('adding a new input in v2 node schema does not shift existing widget value positions relative to a v1-serialized workflow')
  it.todo('v2 named widget value serialization produces an equivalent deserialized widget state as v1 positional widgets_values for the same node type')
  it.todo('v1 workflow with reordered widgets_values array loads into v2 editor with each widget at the correct named position')
})
