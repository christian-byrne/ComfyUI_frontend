/**
 * Hand-written harness smoke tests — I-TF.3 / I-TF.6.
 *
 * These prove the harness wires together end-to-end:
 *   - the World can add / remove / find nodes
 *   - the mini ComfyApp registers v1 extensions
 *   - loadEvidenceSnippet returns a non-empty excerpt for a known
 *     pattern from the snapshotted touch-point database
 *
 * If any of these fail, the generated `it.todo` stubs cannot be
 * filled in safely — fix the harness first.
 */
import { describe, expect, it } from 'vitest'

import {
  countEvidenceExcerpts,
  createHarnessWorld,
  createMiniComfyApp,
  listPatternIds,
  loadEvidenceSnippet,
  runV1,
  runV2
} from '../harness'

describe('harness World', () => {
  it('adds, finds, and removes a node', () => {
    const world = createHarnessWorld()
    const id = world.addNode({ type: 'KSampler' })
    expect(world.findNode(id)?.type).toBe('KSampler')
    expect(world.findNodesByType('KSampler')).toHaveLength(1)
    expect(world.removeNode(id)).toBe(true)
    expect(world.findNode(id)).toBeUndefined()
  })
})

describe('mini ComfyApp', () => {
  it('records v1 extension registrations and queues prompts as no-ops', async () => {
    const app = createMiniComfyApp()
    app.registerExtension({ name: 'demo.v1' })
    expect(app.extensions.map((e) => e.name)).toEqual(['demo.v1'])
    await expect(app.queuePrompt()).resolves.toBeUndefined()

    const id = app.graph.add({ type: 'PreviewImage' })
    expect(app.graph.findNodesByType('PreviewImage')).toHaveLength(1)
    expect(app.graph.remove(id)).toBe(true)
  })
})

describe('runV1 / runV2 placeholders', () => {
  it('return a working harness without throwing', () => {
    const v1 = runV1('// v1 snippet placeholder')
    expect(v1.errors).toEqual([])
    expect(v1.app.extensions).toHaveLength(0)

    const v2 = runV2('// v2 snippet placeholder')
    expect(v2.errors).toEqual([])
    expect(v2.nodeExtensions).toHaveLength(0)
    expect(v2.widgetExtensions).toHaveLength(0)
  })
})

describe('loadEvidenceSnippet', () => {
  it('returns a non-empty excerpt for S4.W1 (widget callback chain)', () => {
    // S4.W1 has 50+ clone-grep evidence rows in the snapshot.
    const snippet = loadEvidenceSnippet('S4.W1', 0)
    expect(snippet.length).toBeGreaterThan(0)
    // The canonical S4.W1 fingerprint involves widget callback wiring.
    expect(snippet.toLowerCase()).toMatch(/callback|widget|original/i)
  })

  it('throws on unknown patternId', () => {
    expect(() => loadEvidenceSnippet('NOT.A.PATTERN', 0)).toThrow(
      /unknown patternId/
    )
  })

  it('exposes every patternId in the snapshot', () => {
    const ids = listPatternIds()
    // Sanity bounds — DB currently holds 56–59 patterns.
    expect(ids.length).toBeGreaterThanOrEqual(50)
    expect(ids).toContain('S4.W1')
    expect(ids).toContain('S2.N1')
  })

  it('counts evidence excerpts per pattern', () => {
    expect(countEvidenceExcerpts('S4.W1')).toBeGreaterThan(0)
    expect(countEvidenceExcerpts('NOT.A.PATTERN')).toBe(0)
  })
})
