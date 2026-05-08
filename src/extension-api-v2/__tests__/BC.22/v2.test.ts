/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.22 — Context menu contributions (node and canvas)
 * Intent: Contribute right-click menu items at both the node and canvas scope, including legacy prototype patches and the supported v1 hooks.
 *
 * DB cross-ref: covers patternIds [S2.N5, S1.H3, S1.H4].
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

describe('BC.22 — Context menu contributions (node and canvas) [v2 contract]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S2.N5', 0) and run against runV2().
  it.todo('S2.N5 — exemplar contract on v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S1.H3', 0) and run against runV2().
  it.todo('S1.H3 — exemplar contract on v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S1.H4', 0) and run against runV2().
  it.todo('S1.H4 — exemplar contract on v2')
})
