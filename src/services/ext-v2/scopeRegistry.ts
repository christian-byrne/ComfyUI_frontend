/**
 * Per-Node Scope Registry — I-SR.2
 *
 * Owns the `Map<NodeEntityId, NodeInstanceScope>` that backs the v2
 * extension API. One scope per live node entity; created on first
 * access, disposed on graph deletion.
 *
 * Lifecycle decisions:
 *  - D2:  scope ≈ Vue ComponentInternalInstance + EffectScope
 *  - D10: hook ordering = registration order, lex tie-break on extName;
 *         setup is sync-only; setupState is proxyRefs-wrapped
 *  - D12: copy/paste deep-clones extensionState into a fresh scope;
 *         watchers / handlers / onScopeDispose closures are NOT shared
 *
 * Subgraph promotion / DOM moves do NOT call disposeScope — the entity
 * id survives the move, so the scope survives with it.
 */
import { EffectScope } from 'vue'

import type {
  NodeEntityId,
  NodeInstanceScope,
  ScopeRegistry
} from '@/types/extensionV2'

function createScope(nodeId: NodeEntityId): NodeInstanceScope {
  return {
    nodeId,
    // Detached: a node-instance scope is a top-level lifetime; it must
    // not auto-attach to whatever active scope happens to be on the
    // stack when the registry is touched.
    effectScope: new EffectScope(true),
    extensionState: {},
    setupExtensions: new Set(),
    hooks: new Map(),
    disposed: false
  }
}

/**
 * Deep-clone an extensionState bag. Vue refs that leaked into the bag
 * (callers should return raw values, but defensive) are unwrapped via
 * structuredClone's plain-object handling — refs are not structured-
 * cloneable, so a wrapped value will throw and surface the misuse.
 *
 * Functions, DOM nodes, and other non-cloneable values throw with a
 * clear DataCloneError, which is what we want — `extensionState` is
 * meant to be data, not behavior. Behavior belongs on the scope's
 * watchers, which are intentionally NOT cloned (D12).
 */
function deepCloneExtensionState(
  src: Record<string, unknown>
): Record<string, unknown> {
  // structuredClone is available in all supported runtimes (Node 17+,
  // all evergreen browsers). It handles cycles, Maps, Sets, typed
  // arrays — strictly more capable than JSON.parse(JSON.stringify(...)).
  return structuredClone(src)
}

export function createScopeRegistry(): ScopeRegistry {
  const scopes = new Map<NodeEntityId, NodeInstanceScope>()

  function getOrCreateScope(nodeId: NodeEntityId): NodeInstanceScope {
    let scope = scopes.get(nodeId)
    if (!scope) {
      scope = createScope(nodeId)
      scopes.set(nodeId, scope)
    }
    return scope
  }

  function getScope(nodeId: NodeEntityId): NodeInstanceScope | undefined {
    return scopes.get(nodeId)
  }

  function disposeScope(nodeId: NodeEntityId): void {
    const scope = scopes.get(nodeId)
    if (!scope) return
    // EffectScope.stop() cascades to every watch/computed/onScopeDispose
    // registered inside scope.effectScope.run(...).
    scope.effectScope.stop()
    scope.disposed = true
    scope.hooks.clear()
    scopes.delete(nodeId)
  }

  function cloneScope(
    srcId: NodeEntityId,
    dstId: NodeEntityId
  ): NodeInstanceScope {
    const src = scopes.get(srcId)
    if (!src) {
      throw new Error(
        `cloneScope: source scope for nodeId=${String(srcId)} does not exist`
      )
    }
    if (scopes.has(dstId)) {
      throw new Error(
        `cloneScope: destination scope for nodeId=${String(dstId)} already exists`
      )
    }
    const dst = createScope(dstId)
    // D12: deep-clone state, fresh effectScope, no shared closures.
    dst.extensionState = deepCloneExtensionState(src.extensionState)
    // setupExtensions intentionally NOT carried over: per task spec,
    // the clone has no live watchers/handlers; whether setup ever re-runs
    // on the clone is a policy decision for the copy/paste call site,
    // not the registry.
    scopes.set(dstId, dst)
    return dst
  }

  return {
    getOrCreateScope,
    getScope,
    disposeScope,
    cloneScope,
    size: () => scopes.size,
    clear: () => {
      for (const scope of scopes.values()) {
        if (!scope.disposed) scope.effectScope.stop()
      }
      scopes.clear()
    }
  }
}

/** Module-level singleton used by `extensionV2Service`. */
export const scopeRegistry: ScopeRegistry = createScopeRegistry()
