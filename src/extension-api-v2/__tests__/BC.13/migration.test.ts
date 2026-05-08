/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.13 — Per-node serialization interception
 * Intent: Intercept node-level serialize/onSerialize to inject custom workflow JSON fields.
 *
 * DB cross-ref: covers patternIds [S2.N6, S2.N15].
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

describe('BC.13 — Per-node serialization interception [v1 → v2 migration]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S2.N6', 0) and run against runV1 + runV2 (assert behavioral parity).
  it.todo('S2.N6 — migrates from v1 to v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S2.N15', 0) and run against runV1 + runV2 (assert behavioral parity).
  it.todo('S2.N15 — migrates from v1 to v2')
})
