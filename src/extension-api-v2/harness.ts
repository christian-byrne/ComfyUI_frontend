/**
 * Test harness stubs for v1 contract tests.
 *
 * Phase A limitation: These are minimal stubs to make tests compile.
 * Real implementations land with Phase B (ECS substrate + eval sandbox).
 */

import type { NodeEntityId } from '@/world/entityIds'

interface HarnessWorld {
  findNode(id: NodeEntityId): { type: string } | undefined
  allNodes(): { type: string }[]
  clear(): void
}

interface MiniGraph {
  add(opts: { type: string }): NodeEntityId
  remove(id: NodeEntityId): void
}

interface MiniComfyApp {
  graph: MiniGraph
}

const nodes = new Map<NodeEntityId, { type: string }>()
let nodeCounter = 0

export function createHarnessWorld(): HarnessWorld {
  nodes.clear()
  nodeCounter = 0
  return {
    findNode(id: NodeEntityId) {
      return nodes.get(id)
    },
    allNodes() {
      return [...nodes.values()]
    },
    clear() {
      nodes.clear()
    }
  }
}

export function createMiniComfyApp(_world: HarnessWorld): MiniComfyApp {
  return {
    graph: {
      add(opts: { type: string }): NodeEntityId {
        const id = (++nodeCounter) as unknown as NodeEntityId
        nodes.set(id, { type: opts.type })
        return id
      },
      remove(id: NodeEntityId): void {
        nodes.delete(id)
      }
    }
  }
}

// Evidence snippet loading — stubs for I-TF.3.C3 POC
const evidenceSnippets: Record<string, string[]> = {
  'S2.N4': [
    'node.onRemoved = function() { clearInterval(this._interval); this._element?.remove(); }'
  ]
}

export function countEvidenceExcerpts(surfaceId: string): number {
  return evidenceSnippets[surfaceId]?.length ?? 0
}

export function loadEvidenceSnippet(surfaceId: string, index: number): string {
  return evidenceSnippets[surfaceId]?.[index] ?? ''
}
