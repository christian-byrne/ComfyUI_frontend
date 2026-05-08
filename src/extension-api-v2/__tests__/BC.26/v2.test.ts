/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: BC.26 — Globals as ABI (window.LiteGraph, window.comfyAPI)
 * Intent: Reach into the global namespace for LiteGraph constructors/enums or the module-as-global comfyAPI registry.
 *
 * DB cross-ref: covers patternIds [S7.G1].
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

describe('BC.26 — Globals as ABI (window.LiteGraph, window.comfyAPI) [v2 contract]', () => {
  // TODO(I-TF): hydrate via loadEvidenceSnippet('S7.G1', 0) and run against runV2().
  it.todo('S7.G1 — exemplar contract on v2')
})
