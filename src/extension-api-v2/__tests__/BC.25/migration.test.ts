/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.25 — Shell UI registration (commands, sidebars, toasts)
 * Intent: Declarative shell-UI contributions through extensionManager / commandManager / sidebarTab / bottomPanel.
 *
 * DB cross-ref: covers patternIds [S12.UI1].
 * Each TODO loads its R8 clone-and-grep excerpt via
 *   loadEvidenceSnippet(patternId, evidenceIndex)
 * and runs it against the harness (`runV1` / `runV2` from
 * `@/extension-api-v2/harness`).
 */
import { describe, it } from 'vitest'

import { loadEvidenceSnippet, runV1, runV2 } from '@/extension-api-v2/harness'

// Keep the harness imports alive while every test below is `it.todo`.
// As tests are filled in, reach for these helpers — see the TODO above
// each `it.todo` for the suggested call.
void [loadEvidenceSnippet, runV1, runV2]

describe('BC.25 — Shell UI registration (commands, sidebars, toasts) [v1 → v2 migration]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S12.UI1', 0) and run against runV1 + runV2 (assert behavioral parity).
  it.todo('S12.UI1 — migrates from v1 to v2')
})
