/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.05 — Custom DOM widgets and node sizing
 * Intent: Contribute DOM-backed widgets and override computeSize so the node reserves the right area for them.
 *
 * DB cross-ref: covers patternIds [S4.W2, S2.N11].
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

describe('BC.05 — Custom DOM widgets and node sizing [v1 contract]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S4.W2', 0) and run against runV1().
  it.todo('S4.W2 — exemplar contract on v1')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S2.N11', 0) and run against runV1().
  it.todo('S2.N11 — exemplar contract on v1')
})
