/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.04 — Node interaction: pointer, selection, resize
 * Intent: User-driven per-node events: mouse down for custom click regions, selection focus, and resize feedback for relayout.
 *
 * DB cross-ref: covers patternIds [S2.N10, S2.N17, S2.N19].
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

describe('BC.04 — Node interaction: pointer, selection, resize [v2 contract]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S2.N10', 0) and run against runV2().
  it.todo('S2.N10 — exemplar contract on v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S2.N17', 0) and run against runV2().
  it.todo('S2.N17 — exemplar contract on v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S2.N19', 0) and run against runV2().
  it.todo('S2.N19 — exemplar contract on v2')
})
