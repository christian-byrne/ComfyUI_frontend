/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.06 — Custom canvas drawing (per-node and canvas-level)
 * Intent: Per-node onDrawForeground and full LGraphCanvas.prototype overrides for badges, indicators, keyboard, and custom render passes.
 *
 * DB cross-ref: covers patternIds [S2.N9, S3.C1].
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

describe('BC.06 — Custom canvas drawing (per-node and canvas-level) [v1 contract]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S2.N9', 0) and run against runV1().
  it.todo('S2.N9 — exemplar contract on v1')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S3.C1', 0) and run against runV1().
  it.todo('S3.C1 — exemplar contract on v1')
})
