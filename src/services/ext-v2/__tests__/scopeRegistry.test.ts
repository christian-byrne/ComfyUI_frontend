/**
 * Tests for I-SR.2 — scope registry + lifecycle.
 *
 * Coverage matrix (matches PR brief):
 *   - create-on-first-access, idempotent get
 *   - dispose stops all registered effects/watchers
 *   - clone produces independent state mutation
 *   - setup runs exactly once per (scope, extensionId)
 *   - hook ordering matches registration order with name tie-breaker
 */
import { describe, expect, it, vi } from 'vitest'
import { onScopeDispose, ref, watch } from 'vue'

import {
  fireHooks,
  getCurrentExtension,
  getHooks,
  registerHook,
  runSetupOnce
} from '@/services/ext-v2/lifecycle'
import { createScopeRegistry } from '@/services/ext-v2/scopeRegistry'
import type { NodeEntityId } from '@/types/extensionV2'

// Helpers — branded ids only need a cast for tests.
const nid = (n: number): NodeEntityId => n as unknown as NodeEntityId

describe('scopeRegistry', () => {
  describe('getOrCreateScope / getScope', () => {
    it('creates a scope on first access', () => {
      const reg = createScopeRegistry()
      expect(reg.getScope(nid(1))).toBeUndefined()
      const scope = reg.getOrCreateScope(nid(1))
      expect(scope).toBeDefined()
      expect(scope.nodeId).toBe(nid(1))
      expect(scope.disposed).toBe(false)
      expect(reg.size()).toBe(1)
    })

    it('returns the same scope on subsequent gets (idempotent)', () => {
      const reg = createScopeRegistry()
      const a = reg.getOrCreateScope(nid(7))
      const b = reg.getOrCreateScope(nid(7))
      const c = reg.getScope(nid(7))
      expect(a).toBe(b)
      expect(a).toBe(c)
      expect(reg.size()).toBe(1)
    })

    it('keeps separate scopes per node id', () => {
      const reg = createScopeRegistry()
      const a = reg.getOrCreateScope(nid(1))
      const b = reg.getOrCreateScope(nid(2))
      expect(a).not.toBe(b)
      expect(reg.size()).toBe(2)
    })
  })

  describe('disposeScope', () => {
    it('stops all watchers/effects registered inside scope.run', () => {
      const reg = createScopeRegistry()
      const scope = reg.getOrCreateScope(nid(1))
      const source = ref(0)
      const watcher = vi.fn()
      scope.effectScope.run(() => {
        watch(source, watcher, { flush: 'sync' })
      })

      // Sanity — watcher fires while scope is alive.
      source.value = 1
      expect(watcher).toHaveBeenCalledTimes(1)

      reg.disposeScope(nid(1))
      expect(scope.disposed).toBe(true)
      expect(scope.effectScope.active).toBe(false)
      expect(reg.getScope(nid(1))).toBeUndefined()

      // After dispose, mutation must not re-trigger the watcher.
      source.value = 2
      expect(watcher).toHaveBeenCalledTimes(1)
    })

    it('runs onScopeDispose callbacks registered during setup', () => {
      const reg = createScopeRegistry()
      const scope = reg.getOrCreateScope(nid(2))
      const cleanup = vi.fn()
      runSetupOnce(
        scope,
        'ext.cleanup',
        () => {
          // Exercises that onScopeDispose registered inside
          // runSetupOnce -> scope.effectScope.run is triggered on
          // disposeScope -> EffectScope.stop().
          onScopeDispose(cleanup)
        },
        { registrationOrder: 0 }
      )
      expect(cleanup).not.toHaveBeenCalled()
      reg.disposeScope(nid(2))
      expect(cleanup).toHaveBeenCalledTimes(1)
    })

    it('is a no-op for unknown ids', () => {
      const reg = createScopeRegistry()
      expect(() => reg.disposeScope(nid(999))).not.toThrow()
    })
  })

  describe('cloneScope (D12)', () => {
    it('deep-clones extensionState into a fresh, independent scope', () => {
      const reg = createScopeRegistry()
      const src = reg.getOrCreateScope(nid(1))
      src.extensionState['ext.counter'] = { count: 5, nested: { v: 'a' } }

      const dst = reg.cloneScope(nid(1), nid(2))
      expect(dst).not.toBe(src)
      expect(dst.nodeId).toBe(nid(2))
      expect(dst.extensionState['ext.counter']).toEqual({
        count: 5,
        nested: { v: 'a' }
      })

      // Mutating clone state must not touch source state.
      ;(dst.extensionState['ext.counter'] as { count: number }).count = 99
      ;(
        dst.extensionState['ext.counter'] as { nested: { v: string } }
      ).nested.v = 'b'
      expect(
        (src.extensionState['ext.counter'] as { count: number }).count
      ).toBe(5)
      expect(
        (src.extensionState['ext.counter'] as { nested: { v: string } })
          .nested.v
      ).toBe('a')
    })

    it('does not share the EffectScope or registered hooks', () => {
      const reg = createScopeRegistry()
      const src = reg.getOrCreateScope(nid(1))
      runSetupOnce(
        src,
        'ext.with-hook',
        () => registerHook('mounted', () => {}),
        { registrationOrder: 0 }
      )
      expect(src.hooks.get('mounted')?.length).toBe(1)

      const dst = reg.cloneScope(nid(1), nid(2))
      expect(dst.effectScope).not.toBe(src.effectScope)
      expect(dst.hooks.size).toBe(0)
      expect(dst.setupExtensions.size).toBe(0)

      // Disposing the clone must not affect the source's scope.
      reg.disposeScope(nid(2))
      expect(src.effectScope.active).toBe(true)
    })

    it('throws when source missing or destination already exists', () => {
      const reg = createScopeRegistry()
      reg.getOrCreateScope(nid(1))
      expect(() => reg.cloneScope(nid(99), nid(2))).toThrow(/source scope/)
      reg.getOrCreateScope(nid(3))
      expect(() => reg.cloneScope(nid(1), nid(3))).toThrow(/destination scope/)
    })
  })
})

describe('lifecycle.runSetupOnce', () => {
  it('runs setup exactly once per (scope, extensionId)', () => {
    const reg = createScopeRegistry()
    const scope = reg.getOrCreateScope(nid(1))
    const setup = vi.fn()
    const ranA = runSetupOnce(scope, 'ext.a', setup, { registrationOrder: 0 })
    const ranB = runSetupOnce(scope, 'ext.a', setup, { registrationOrder: 0 })
    expect(ranA).toBe(true)
    expect(ranB).toBe(false)
    expect(setup).toHaveBeenCalledTimes(1)
    expect(scope.setupExtensions.has('ext.a')).toBe(true)
  })

  it('runs different extensions independently', () => {
    const reg = createScopeRegistry()
    const scope = reg.getOrCreateScope(nid(1))
    const a = vi.fn()
    const b = vi.fn()
    runSetupOnce(scope, 'ext.a', a, { registrationOrder: 0 })
    runSetupOnce(scope, 'ext.b', b, { registrationOrder: 1 })
    expect(a).toHaveBeenCalledTimes(1)
    expect(b).toHaveBeenCalledTimes(1)
  })

  it('exposes currentExtension only inside setup', () => {
    const reg = createScopeRegistry()
    const scope = reg.getOrCreateScope(nid(1))
    expect(getCurrentExtension()).toBeNull()
    let inside: ReturnType<typeof getCurrentExtension> = null
    runSetupOnce(
      scope,
      'ext.inside',
      () => {
        inside = getCurrentExtension()
      },
      { registrationOrder: 42 }
    )
    expect(inside).not.toBeNull()
    expect(inside!.extensionId).toBe('ext.inside')
    expect(inside!.registrationOrder).toBe(42)
    expect(getCurrentExtension()).toBeNull()
  })

  it('restores currentExtension even when setup throws', () => {
    const reg = createScopeRegistry()
    const scope = reg.getOrCreateScope(nid(1))
    expect(() =>
      runSetupOnce(
        scope,
        'ext.boom',
        () => {
          throw new Error('boom')
        },
        { registrationOrder: 0 }
      )
    ).toThrow('boom')
    expect(getCurrentExtension()).toBeNull()
  })

  it('throws if invoked on a disposed scope', () => {
    const reg = createScopeRegistry()
    const scope = reg.getOrCreateScope(nid(1))
    reg.disposeScope(nid(1))
    expect(() =>
      runSetupOnce(scope, 'ext.x', () => {}, { registrationOrder: 0 })
    ).toThrow(/disposed/)
  })

  it('registerHook outside setup throws', () => {
    expect(() => registerHook('mounted', () => {})).toThrow(/outside setup/)
  })
})

describe('lifecycle hook ordering (D10b)', () => {
  it('orders by registration order across extensions', () => {
    const reg = createScopeRegistry()
    const scope = reg.getOrCreateScope(nid(1))
    const fired: string[] = []
    runSetupOnce(
      scope,
      'zzz',
      () => registerHook('mounted', () => fired.push('zzz')),
      { registrationOrder: 0 }
    )
    runSetupOnce(
      scope,
      'aaa',
      () => registerHook('mounted', () => fired.push('aaa')),
      { registrationOrder: 1 }
    )
    fireHooks(scope, 'mounted')
    // zzz registered first (order 0) — wins regardless of name.
    expect(fired).toEqual(['zzz', 'aaa'])
  })

  it('lex tie-breaks on extension name when registration order is equal', () => {
    const reg = createScopeRegistry()
    const scope = reg.getOrCreateScope(nid(1))
    const fired: string[] = []
    // Both extensions registered "in the same microtask" — same order.
    runSetupOnce(
      scope,
      'zzz-debug',
      () => registerHook('mounted', () => fired.push('zzz-debug')),
      { registrationOrder: 5 }
    )
    runSetupOnce(
      scope,
      'aaa-bg',
      () => registerHook('mounted', () => fired.push('aaa-bg')),
      { registrationOrder: 5 }
    )
    fireHooks(scope, 'mounted')
    // Lex tie-break: 'aaa-bg' < 'zzz-debug'.
    expect(fired).toEqual(['aaa-bg', 'zzz-debug'])
  })

  it('preserves call order within the same extension setup', () => {
    const reg = createScopeRegistry()
    const scope = reg.getOrCreateScope(nid(1))
    const fired: string[] = []
    runSetupOnce(
      scope,
      'multi',
      () => {
        registerHook('mounted', () => fired.push('first'))
        registerHook('mounted', () => fired.push('second'))
        registerHook('mounted', () => fired.push('third'))
      },
      { registrationOrder: 0 }
    )
    fireHooks(scope, 'mounted')
    expect(fired).toEqual(['first', 'second', 'third'])
  })

  it('getHooks returns a defensive copy that callers cannot mutate', () => {
    const reg = createScopeRegistry()
    const scope = reg.getOrCreateScope(nid(1))
    runSetupOnce(
      scope,
      'ext',
      () => registerHook('mounted', () => {}),
      { registrationOrder: 0 }
    )
    const a = getHooks(scope, 'mounted')
    a.length = 0
    expect(getHooks(scope, 'mounted').length).toBe(1)
  })
})
