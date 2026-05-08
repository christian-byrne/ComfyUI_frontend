/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.20 — Custom node-type registration (frontend-only / virtual)
 * Intent: Register pure-frontend or fully virtual node types and mark them with isVirtualNode so the backend ignores them.
 *
 * DB cross-ref: covers patternIds [S1.H5, S1.H6, S8.P1].
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

describe('BC.20 — Custom node-type registration (frontend-only / virtual) [v2 contract]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S1.H5', 0) and run against runV2().
  it.todo('S1.H5 — exemplar contract on v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S1.H6', 0) and run against runV2().
  it.todo('S1.H6 — exemplar contract on v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S8.P1', 0) and run against runV2().
  it.todo('S8.P1 — exemplar contract on v2')
})
