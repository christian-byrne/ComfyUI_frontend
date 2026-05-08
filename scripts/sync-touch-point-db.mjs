#!/usr/bin/env node
/**
 * sync-touch-point-db.mjs
 *
 * Sync the touch-point database + behavior-categories YAML from the
 * research workspace into the in-tree fixture snapshot under
 * `src/extension-api-v2/harness/__fixtures__/`.
 *
 * Idempotent: re-running just refreshes the snapshot.
 *
 * Why this exists:
 *   - The v2 extension API test framework consumes evidence excerpts
 *     (`loadEvidenceSnippet`) and behavior categories from R8 / I-TF.1.
 *   - The canonical source lives in the research workspace at
 *     `cross-repo-tasks/ecs-vue-hoisted-client-state-hook-api/research/`.
 *   - We pin a snapshot in-tree so the harness has no cross-repo
 *     dependency at runtime (and so PR diffs are reproducible).
 *
 * The script writes BOTH the verbatim YAML (for human review in PRs)
 * and a parsed JSON copy (consumed by the harness — no Node yaml dep
 * required at runtime).
 *
 * YAML → JSON parsing is delegated to Python's PyYAML because:
 *   1. The upstream generator is already Python-based.
 *   2. Adding a Node `yaml` package would expand prod surface for what
 *      is a one-shot devtool.
 *
 * Usage:
 *   node scripts/sync-touch-point-db.mjs
 *   node scripts/sync-touch-point-db.mjs --source <path-to-research-touch-points-dir>
 */
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')

// Resolution order for the research workspace:
//   1) explicit --source <dir>
//   2) $ECS_RESEARCH_DIR env var
//   3) ../../../cross-repo-tasks/... (worktree-rooted layout)
//   4) ~/cross-repo-tasks/... (default checkout location)
const CANDIDATES = [
  resolve(
    REPO_ROOT,
    '../../../cross-repo-tasks/ecs-vue-hoisted-client-state-hook-api/research/touch-points'
  ),
  resolve(
    homedir(),
    'cross-repo-tasks/ecs-vue-hoisted-client-state-hook-api/research/touch-points'
  )
]

const argv = process.argv.slice(2)
let sourceDir
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--source' && argv[i + 1]) {
    sourceDir = resolve(argv[i + 1])
    i++
  }
}
if (!sourceDir && process.env.ECS_RESEARCH_DIR) {
  sourceDir = resolve(process.env.ECS_RESEARCH_DIR)
}
if (!sourceDir) {
  sourceDir = CANDIDATES.find((p) => existsSync(p))
}
if (!sourceDir || !existsSync(sourceDir)) {
  console.error(
    'Could not locate research workspace. Pass --source <dir> or set ECS_RESEARCH_DIR.'
  )
  console.error('Tried:\n  ' + CANDIDATES.join('\n  '))
  process.exit(1)
}

const FIXTURES_DIR = join(
  REPO_ROOT,
  'src',
  'extension-api-v2',
  'harness',
  '__fixtures__'
)

mkdirSync(FIXTURES_DIR, { recursive: true })

const FILES = [
  { yaml: 'database.yaml', stem: 'touch-point-database' },
  { yaml: 'behavior-categories.yaml', stem: 'behavior-categories' }
]

function yamlToJson(yamlPath) {
  const out = execFileSync(
    'python3',
    [
      '-c',
      'import json,sys,yaml;json.dump(yaml.safe_load(open(sys.argv[1])),sys.stdout,default=str)',
      yamlPath
    ],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  )
  return out
}

const summary = []
for (const { yaml, stem } of FILES) {
  const src = join(sourceDir, yaml)
  const dstYaml = join(FIXTURES_DIR, `${stem}.yaml`)
  const dstJson = join(FIXTURES_DIR, `${stem}.json`)
  copyFileSync(src, dstYaml)
  const json = yamlToJson(src)
  writeFileSync(dstJson, json)
  summary.push({ yaml: dstYaml, json: dstJson })
}

for (const s of summary) {
  console.log(`wrote ${s.yaml}`)
  console.log(`wrote ${s.json}`)
}
console.log(`source: ${sourceDir}`)
