// Category: BC.15 — Workflow loading into the editor
// DB cross-ref: S6.A2
// Exemplar: https://github.com/BennyKok/comfyui-deploy/blob/main/web-plugin/workflow-list.js#L456
// blast_radius: 5.05 (compat-floor)
// compat-floor: blast_radius ≥ 2.0
// Migration: v1 app.loadGraphData(json) → v2 app.loadWorkflow(json) with lifecycle hooks

import { describe, it } from 'vitest'

describe('BC.15 migration — workflow loading', () => {
  describe('graph state equivalence', () => {
    it.todo(
      'v1 app.loadGraphData(json) and v2 app.loadWorkflow(json) produce identical node/link graphs for the same input'
    )
    it.todo(
      'node widget values are preserved identically between v1 and v2 load paths'
    )
    it.todo(
      'custom node types registered by extensions are correctly hydrated by both v1 and v2 load paths'
    )
  })

  describe('interception migration', () => {
    it.todo(
      'v1 monkey-patching app.loadGraphData to mutate json can be replaced by a v2 beforeLoadWorkflow handler with equivalent effect'
    )
    it.todo(
      'v1 post-load logic run synchronously after app.loadGraphData can be moved to a v2 afterLoadWorkflow handler'
    )
  })

  describe('coexistence', () => {
    it.todo(
      'calling v2 app.loadWorkflow does not break extensions that still listen on the legacy nodeCreated hook'
    )
  })
})
