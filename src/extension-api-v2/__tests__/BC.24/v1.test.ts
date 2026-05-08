/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.24 — Node-def schema inspection
 * Intent: Branch on ComfyNodeDef shape (input.required/optional/hidden, output, output_node, category) to drive UI.
 *
 * DB cross-ref: covers patternIds [S13.SC1].
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

describe('BC.24 — Node-def schema inspection [v1 contract]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S13.SC1', 0) and run against runV1().
  it.todo('S13.SC1 — exemplar contract on v1')
})
