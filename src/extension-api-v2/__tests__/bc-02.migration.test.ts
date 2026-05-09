// Category: BC.02 — Node lifecycle: teardown
// DB cross-ref: S2.N4
// Exemplar: https://github.com/Lightricks/ComfyUI-LTXVideo/blob/main/web/js/sparse_track_editor.js#L137
// compat-floor: blast_radius 5.20 ≥ 2.0 — MUST pass before v2 ships
// Migration: v1 node.onRemoved assignment → v2 defineNodeExtension({ onRemoved(handle) })

import { describe, it } from 'vitest'

describe('BC.02 migration — node lifecycle: teardown', () => {
  describe('invocation parity (S2.N4)', () => {
    it.todo(
      'v1 onRemoved and v2 onRemoved are both called the same number of times for the same sequence of node removals'
    )
    it.todo(
      'v2 onRemoved fires at the same point in the removal lifecycle as v1 (after node is detached from graph)'
    )
  })

  describe('resource cleanup equivalence', () => {
    it.todo(
      'intervals cleared in v1 onRemoved are equally suppressible via NodeHandle.onDispose() in v2 without manual tracking'
    )
    it.todo(
      'DOM elements removed manually in v1 onRemoved are automatically removed by v2 auto-disposal when registered via addDOMWidget()'
    )
    it.todo(
      'observer.disconnect() patterns in v1 can be replaced by NodeHandle.onDispose(() => observer.disconnect()) in v2'
    )
  })

  describe('graph clear coverage', () => {
    it.todo(
      'both v1 and v2 teardown hooks are invoked for all nodes when graph.clear() is called'
    )
  })
})
