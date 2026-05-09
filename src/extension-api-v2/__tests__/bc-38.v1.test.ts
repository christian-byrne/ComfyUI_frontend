// Category: BC.38 — Canvas mode observation
// DB cross-ref: S17.AM1
// Exemplar: https://www.notion.so/comfy-org/Develop-a-custom-node-from-scratch-pain-point-assessment-33c6d73d365080f49126c0b5affa7559
// blast_radius: 0.0
// compat-floor: NO (absent API gap — no stable v1 API exists)
// v1 contract: no API — must poll app.canvas.mode or use heuristics (broken)
// Note: appModeStore is a Pinia composable; JS extensions cannot use Vue composables directly.
//       DISTINCT from NodeModeChangedEvent (execution mode: muted/bypass/always/once/trigger).

import { describe, it } from 'vitest'

describe('BC.38 v1 contract — canvas mode observation', () => {
  describe('S17.AM1 — polling workaround', () => {
    it.todo(
      'extension can read app.canvas.mode synchronously to determine the current canvas mode'
    )
    it.todo(
      'polling app.canvas.mode on an interval detects transitions between graph/app/builder modes'
    )
    it.todo(
      'heuristic-based mode detection (checking DOM classes or element visibility) is fragile and breaks on UI changes'
    )
  })

  describe('S17.AM1 — absence of stable hook', () => {
    it.todo(
      'no app.on or registerExtension hook fires when canvas mode changes'
    )
    it.todo(
      'NodeModeChangedEvent is distinct from canvas mode change and must not be used as a proxy'
    )
    it.todo(
      'JS extensions cannot import appModeStore from Vue composable layer — import throws at runtime'
    )
  })
})
