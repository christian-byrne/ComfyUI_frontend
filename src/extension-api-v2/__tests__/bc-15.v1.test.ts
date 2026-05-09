// Category: BC.15 — Workflow loading into the editor
// DB cross-ref: S6.A2
// Exemplar: https://github.com/BennyKok/comfyui-deploy/blob/main/web-plugin/workflow-list.js#L456
// blast_radius: 5.05 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// v1 contract: app.loadGraphData(workflowJson) — direct call, no lifecycle events

import { describe, it } from 'vitest'

describe('BC.15 v1 contract — app.loadGraphData', () => {
  describe('S6.A2 — direct workflow load', () => {
    it.todo(
      'app.loadGraphData(json) replaces the current graph with the nodes and links from json'
    )
    it.todo(
      'calling app.loadGraphData clears all existing nodes before deserializing the new workflow'
    )
    it.todo(
      'node IDs in the loaded workflow are preserved as-is in the editor graph'
    )
    it.todo(
      'app.loadGraphData accepts a plain JSON object (not a string) as its argument'
    )
    it.todo(
      'extensions registered with nodeCreated receive each deserialized node after loadGraphData completes'
    )
  })
})
