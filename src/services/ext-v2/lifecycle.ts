/**
 * Lifecycle — I-SR.2
 *
 * `runSetupOnce` runs an extension's `setup` callback against a node-
 * instance scope using Vue `EffectScope.run()` semantics, exactly once
 * per (scope, extensionId) pair. Subsequent calls are no-ops.
 *
 * Hook factories (e.g. `onNodeMounted`) call `registerHook` while
 * `currentExtension` is set — D10a's `currentInstance`-style global —
 * and the resulting `RegisteredHook` records the extension's
 * registration order plus the call order within `setup`. `getHooks`
 * returns hooks sorted by:
 *
 *   1. extension registration order (caller-supplied)
 *   2. extension name (lex tie-break, per D10b)
 *   3. call order within the same setup body (Vue's array-push order)
 *
 * Setup is sync-only (D10c). Hook factories called outside a
 * `runSetupOnce` window throw — the lint-friendly Vue analog of
 * "lifecycle hook called outside setup()".
 */
import type {
  ExtensionId,
  LifecycleHookName,
  NodeInstanceScope,
  RegisteredHook
} from '@/types/extensionV2'

interface CurrentExtension {
  readonly extensionId: ExtensionId
  readonly registrationOrder: number
  readonly scope: NodeInstanceScope
  callCounter: number
}

let currentExtension: CurrentExtension | null = null

/**
 * Public for diagnostics / tests. Hook factories check this internally.
 */
export function getCurrentExtension(): CurrentExtension | null {
  return currentExtension
}

export interface RunSetupOptions {
  /**
   * Caller-supplied registration order for the extension. Typically
   * the index of the extension in the host's registration list.
   * Equal values are tie-broken on extensionId lex order at read time.
   */
  registrationOrder: number
}

/**
 * Run an extension's setup callback against a scope, exactly once.
 *
 * Returns `true` if setup ran, `false` if it was already run for this
 * (scope, extensionId) pair.
 *
 * Errors thrown inside `setupFn` propagate after `currentExtension`
 * and reactive-tracking state are restored — caller decides whether to
 * mark the extension failed and skip future hooks.
 */
export function runSetupOnce(
  scope: NodeInstanceScope,
  extensionId: ExtensionId,
  setupFn: () => unknown,
  options: RunSetupOptions
): boolean {
  if (scope.disposed) {
    throw new Error(
      `runSetupOnce: scope for nodeId=${String(scope.nodeId)} is disposed`
    )
  }
  if (scope.setupExtensions.has(extensionId)) return false
  scope.setupExtensions.add(extensionId)

  const previous = currentExtension
  currentExtension = {
    extensionId,
    registrationOrder: options.registrationOrder,
    scope,
    callCounter: 0
  }

  // NOTE: Vue's setupStatefulComponent calls pauseTracking() here so
  // synchronously-touched reactive values don't accidentally become
  // dependencies of whatever effect happens to be active. Those
  // helpers are not part of Vue's public surface (they live in
  // @vue/reactivity internals), so we defer that guard to Phase B
  // where the ECS substrate exposes its own tracking primitives. The
  // EffectScope is still active inside `run`, which is what matters
  // for cleanup.
  try {
    scope.effectScope.run(() => {
      setupFn()
    })
  } finally {
    currentExtension = previous
  }

  return true
}

/**
 * Register a lifecycle hook on the current scope. Must be called
 * synchronously inside a `runSetupOnce` window.
 *
 * Hooks are stored unordered; `getHooks` sorts on read so that hook
 * registration is O(1) and ordering reflects the most-recent global
 * extension order even if extensions are loaded lazily.
 */
export function registerHook(
  name: LifecycleHookName,
  fn: (...args: unknown[]) => unknown
): void {
  const ctx = currentExtension
  if (!ctx) {
    throw new Error(
      `registerHook("${name}"): lifecycle hook called outside setup()`
    )
  }
  const hook: RegisteredHook = {
    extensionId: ctx.extensionId,
    registrationOrder: ctx.registrationOrder,
    callOrder: ctx.callCounter++,
    fn
  }
  const list = ctx.scope.hooks.get(name)
  if (list) {
    list.push(hook)
  } else {
    ctx.scope.hooks.set(name, [hook])
  }
}

/**
 * Read hooks for `name` from `scope`, in firing order.
 *
 * Stable sort by (registrationOrder, extensionId, callOrder).
 */
export function getHooks(
  scope: NodeInstanceScope,
  name: LifecycleHookName
): RegisteredHook[] {
  const list = scope.hooks.get(name)
  if (!list || list.length === 0) return []
  // Defensive copy so callers can't mutate the live array.
  const copy = list.slice()
  copy.sort((a, b) => {
    if (a.registrationOrder !== b.registrationOrder) {
      return a.registrationOrder - b.registrationOrder
    }
    if (a.extensionId !== b.extensionId) {
      return a.extensionId < b.extensionId ? -1 : 1
    }
    return a.callOrder - b.callOrder
  })
  return copy
}

/**
 * Convenience: run all registered hooks for `name` in order.
 * Errors in one hook do not block subsequent hooks; they are collected
 * and re-thrown as an AggregateError after all hooks have fired.
 */
export function fireHooks(
  scope: NodeInstanceScope,
  name: LifecycleHookName,
  ...args: unknown[]
): void {
  const errors: unknown[] = []
  for (const hook of getHooks(scope, name)) {
    try {
      hook.fn(...args)
    } catch (err) {
      errors.push(err)
    }
  }
  if (errors.length === 1) throw errors[0]
  if (errors.length > 1) {
    throw new AggregateError(errors, `fireHooks("${name}"): ${errors.length} hook(s) threw`)
  }
}
