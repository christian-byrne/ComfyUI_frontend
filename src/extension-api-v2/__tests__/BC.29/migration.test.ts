/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.29 — Graph enumeration, mutation, and cross-scope identity
 * Intent: Enumerate or mutate the node set (graph.add/remove/findNodesByType/serialize/configure) and resolve cross-subgraph references via NodeLocatorId / NodeExecutionId.
 *
 * DB cross-ref: covers patternIds [S11.G2, S14.ID1].
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

describe('BC.29 — Graph enumeration, mutation, and cross-scope identity [v1 → v2 migration]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S11.G2', 0) and run against runV1 + runV2 (assert behavioral parity).
  it.todo('S11.G2 — migrates from v1 to v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S14.ID1', 0) and run against runV1 + runV2 (assert behavioral parity).
  it.todo('S14.ID1 — migrates from v1 to v2')
})
