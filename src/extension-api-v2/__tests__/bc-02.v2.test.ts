// Category: BC.02 — Node lifecycle: teardown
// DB cross-ref: S2.N4
// Exemplar: https://github.com/Lightricks/ComfyUI-LTXVideo/blob/main/web/js/sparse_track_editor.js#L137
// compat-floor: blast_radius 5.20 ≥ 2.0 — MUST pass before v2 ships
// v2 replacement: defineNodeExtension({ onRemoved(handle) { ... } })
// Note: v2 onRemoved runs inside the NodeHandle scope; extension-owned resources
//       registered via handle APIs are auto-disposed before onRemoved fires.

import { describe, it } from 'vitest'

describe('BC.02 v2 contract — node lifecycle: teardown', () => {
  describe('onRemoved(handle) — cleanup hook', () => {
    it.todo(
      'onRemoved is called exactly once per node instance when the node is removed from the graph'
    )
    it.todo(
      'onRemoved receives the same NodeHandle that was passed to nodeCreated for the same instance'
    )
    it.todo(
      'NodeHandle.getState() is still readable inside onRemoved (state not yet cleared)'
    )
    it.todo(
      'onRemoved is called for every node when the graph is cleared, in no guaranteed order'
    )
  })

  describe('auto-disposal of handle-registered resources', () => {
    it.todo(
      'DOM widgets registered via NodeHandle.addDOMWidget() are removed from the DOM before onRemoved fires'
    )
    it.todo(
      'cleanup functions registered via NodeHandle.onDispose() are invoked before onRemoved fires'
    )
    it.todo(
      'extension can still perform additional teardown in onRemoved after auto-disposal completes'
    )
  })
})
