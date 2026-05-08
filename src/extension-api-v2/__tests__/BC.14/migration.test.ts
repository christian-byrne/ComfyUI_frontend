/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.14 — Workflow → API serialization interception (graphToPrompt)
 * Intent: Patch app.graphToPrompt to resolve virtual nodes, inject custom metadata, or rewrite the API payload before submit.
 *
 * DB cross-ref: covers patternIds [S6.A1].
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

describe('BC.14 — Workflow → API serialization interception (graphToPrompt) [v1 → v2 migration]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S6.A1', 0) and run against runV1 + runV2 (assert behavioral parity).
  it.todo('S6.A1 — migrates from v1 to v2')
})
