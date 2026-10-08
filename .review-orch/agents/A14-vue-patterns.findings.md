## Agent: vue-patterns

### Summary

The billing-routing refactor is reactively sound. `useBillingRouting` returns `computed` refs (`type`, `shouldUseWorkspaceBilling`); consumers destructure the refs themselves (not `.value`), so reactivity is preserved everywhere. `flags` from `useFeatureFlags` is `reactive(readonly(...))` and each getter reads reactive sources (`remoteConfig.value`, `isAuthenticatedConfigLoaded.value`, `cachedValue.value`), so the routing computed tracks flag/config changes. Passing `type` through the shared `useBillingContext` is safe: it is consumed via `.value` inside the `activeContext` computed and the `[activeWorkspace?.id, type.value]` watch, so a mid-session flag/workspace flip re-derives the active backend and re-inits. The async-race handling (load tokens + `onScopeDispose`, adapter-supersede checks) is correct. No reactivity is lost across consumers.

### Findings

#### [n1] Duplicate `useBillingRouting()` instances instead of reusing the shared context
- **File:** `src/platform/cloud/subscription/components/SubscriptionPanel.vue:45`, `src/components/dialog/content/setting/UsageLogsTable.vue:120`
- **Severity:** nitpick
- **Category:** framework
- **Description:** `SubscriptionPanel` calls both `useBillingRouting()` and `useBillingContext()`, and `useBillingContext` already instantiates its own `useBillingRouting()` and re-exports `type`. Each call site creates a fresh pair of computeds. This is not a bug — all instances track the same reactive sources so they stay in sync — but it re-derives the same value in several scopes. Reusing `useBillingContext().type` (or exposing `shouldUseWorkspaceBilling` from the context) would centralize the routing. Note: `useSubscriptionDialog` deliberately avoids reading `useBillingContext` at setup due to the documented `useBillingContext -> useWorkspaceBilling -> useSubscriptionDialog` import cycle, so its standalone `useBillingRouting()` call is the correct choice there and should stay.
- **Suggestion:** Optionally consume `type`/derive `shouldUseWorkspaceBilling` from `useBillingContext()` in `SubscriptionPanel` and `UsageLogsTable` to avoid the duplicate computeds; leave `useSubscriptionDialog` as-is.

#### [n2] `catch` parameter `error` shadows the reactive `error` ref
- **File:** `src/components/dialog/content/setting/UsageLogsTable.vue:207`, `:218`
- **Severity:** nitpick
- **Category:** framework
- **Description:** The `onPageChange` and `watch(shouldUseWorkspaceBilling, ...)` handlers use `.catch((error) => ...)`, shadowing the module-scope `const error = ref<string | null>(null)`. The callbacks only `console.error(..., error)` the local, so behavior is correct today, but any future attempt to set `error.value` inside these callbacks would silently hit the shadowing parameter instead of the ref. Minor readability/foot-gun.
- **Suggestion:** Rename the caught value (e.g. `(err) =>`) to keep the reactive `error` ref unambiguous within the setup scope.

### Notes (verified, no issue)
- `SubscriptionPanel.vue:21` `v-if="shouldUseWorkspaceBilling"` — computed ref unwrapped in template, flips the `defineAsyncComponent` branch reactively. Correct.
- `UsageLogsTable.vue:217` `watch(shouldUseWorkspaceBilling, ...)` — non-immediate watch is intentional (initial load is parent-driven via the exposed `refresh()`), auto-disposed on unmount; the `onScopeDispose` token bump plus `loadToken` guard correctly discard superseded/post-unmount responses. `useTelemetry()` is a module singleton (no lifecycle/inject context), so calling it after `await` is safe and the "run telemetry for a superseded response" path is live, not dead.
- `useBillingContext.ts:191` watch on `[activeWorkspace?.id, type.value]` with `resetBillingState` + adapter-identity supersede check correctly handles a mid-session `type` flip. `defineExpose({ refresh })` in `UsageLogsTable` is an appropriate imperative method (not state). No Options API, no `defineEmits` array syntax, no `withDefaults`, no props mutation introduced.
