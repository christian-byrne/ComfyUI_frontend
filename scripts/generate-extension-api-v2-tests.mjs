#!/usr/bin/env node
/**
 * generate-extension-api-v2-tests.mjs — I-TF.2
 *
 * Read the snapshotted `behavior-categories.json` (committed under
 * `src/extension-api-v2/harness/__fixtures__/`) and emit one
 * `{v1,v2,migration}.test.ts` triple per behavior category under
 * `src/extension-api-v2/__tests__/<category-id>/`.
 *
 * Each emitted file:
 *   - declares the behavior-category ID, name, and intent in the
 *     header comment
 *   - lists the covered patternIds with a TODO pointing at
 *     `loadEvidenceSnippet(patternId, evidenceIndex)`
 *   - declares one `it.todo(...)` per member patternId so that the
 *     test report shows pending coverage at the pattern grain
 *
 * Re-run after `sync-touch-point-db.mjs` whenever the categories
 * change. Generated files ARE committed (reviewers and coworkers need
 * to see them — todo.md explicitly forbids gitignoring).
 *
 * Usage:
 *   node scripts/generate-extension-api-v2-tests.mjs
 */
import {
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')

const FIXTURES_JSON = join(
  REPO_ROOT,
  'src/extension-api-v2/harness/__fixtures__/behavior-categories.json'
)
const TESTS_DIR = join(REPO_ROOT, 'src/extension-api-v2/__tests__')

const doc = JSON.parse(readFileSync(FIXTURES_JSON, 'utf8'))
const categories = doc.categories ?? []

if (categories.length === 0) {
  console.error('No categories found in', FIXTURES_JSON)
  process.exit(1)
}

const KINDS = /** @type {const} */ (['v1', 'v2', 'migration'])

/**
 * @param {string} category_id
 * @param {string} name
 * @param {string} intent
 * @param {string[]} member_pattern_ids
 * @param {'v1' | 'v2' | 'migration'} kind
 */
function renderTestFile(category_id, name, intent, member_pattern_ids, kind) {
  const headerLabel = (() => {
    switch (kind) {
      case 'v1':
        return 'v1 contract'
      case 'v2':
        return 'v2 contract'
      case 'migration':
        return 'v1 → v2 migration'
    }
  })()
  const patternsList = member_pattern_ids.join(', ')
  const todos = member_pattern_ids
    .map((pid) => {
      const note =
        kind === 'migration'
          ? `migrates from v1 to v2`
          : `exemplar contract on ${kind}`
      return (
        `  // TODO(I-TF): hydrate via loadEvidenceSnippet('${pid}', 0) and run` +
        ` against ${kind === 'migration' ? 'runV1 + runV2 (assert behavioral parity)' : 'run' + kind.toUpperCase() + '()'}.\n` +
        `  it.todo('${pid} — ${note}')`
      )
    })
    .join('\n\n')

  return `/**
 * GENERATED FILE — do not edit by hand.
 * Source: src/extension-api-v2/harness/__fixtures__/behavior-categories.json
 * Regenerate: node scripts/generate-extension-api-v2-tests.mjs
 *
 * Behavior category: ${category_id} — ${name}
 * Intent: ${intent}
 *
 * DB cross-ref: covers patternIds [${patternsList}].
 * Each TODO loads its R8 clone-and-grep excerpt via
 *   loadEvidenceSnippet(patternId, evidenceIndex)
 * and runs it against the harness (\`runV1\` / \`runV2\` from
 * \`@/extension-api-v2/harness\`).
 */
import { describe, it } from 'vitest'

import { loadEvidenceSnippet, runV1, runV2 } from '@/extension-api-v2/harness'

// Keep the harness imports alive while every test below is \`it.todo\`.
// As tests are filled in, reach for these helpers — see the TODO above
// each \`it.todo\` for the suggested call.
void [loadEvidenceSnippet, runV1, runV2]

describe('${category_id} — ${name} [${headerLabel}]', () => {
${todos}
})
`
}

// Wipe and re-create the generated tree to keep the snapshot canonical.
// Hand-written tests live as flat *.test.ts files at the top of __tests__/
// (e.g. harness.smoke.test.ts) so they are NOT removed by this loop —
// only directories matching a known category_id are pruned.
for (const cat of categories) {
  const dir = join(TESTS_DIR, cat.category_id)
  rmSync(dir, { recursive: true, force: true })
}

let written = 0
for (const cat of categories) {
  const dir = join(TESTS_DIR, cat.category_id)
  mkdirSync(dir, { recursive: true })
  for (const kind of KINDS) {
    const file = join(dir, `${kind}.test.ts`)
    const body = renderTestFile(
      cat.category_id,
      cat.name,
      cat.intent,
      cat.member_pattern_ids,
      kind
    )
    writeFileSync(file, body)
    written++
  }
}

console.log(
  `wrote ${written} test files across ${categories.length} categories under ${TESTS_DIR}`
)
