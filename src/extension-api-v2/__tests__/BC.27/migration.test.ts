/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.27 — LiteGraph entity direct manipulation (reroute, group, link, slot)
 * Intent: Direct read/mutation of reroutes, groups, links, and slots — no public extension API exists today.
 *
 * DB cross-ref: covers patternIds [S9.R1, S9.G1, S9.L1, S9.S1].
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

describe('BC.27 — LiteGraph entity direct manipulation (reroute, group, link, slot) [v1 → v2 migration]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S9.R1', 0) and run against runV1 + runV2 (assert behavioral parity).
  it.todo('S9.R1 — migrates from v1 to v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S9.G1', 0) and run against runV1 + runV2 (assert behavioral parity).
  it.todo('S9.G1 — migrates from v1 to v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S9.L1', 0) and run against runV1 + runV2 (assert behavioral parity).
  it.todo('S9.L1 — migrates from v1 to v2')

  // TODO(I-TF): hydrate via loadEvidenceSnippet('S9.S1', 0) and run against runV1 + runV2 (assert behavioral parity).
  it.todo('S9.S1 — migrates from v1 to v2')
})
