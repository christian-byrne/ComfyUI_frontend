# A2 Bug Hunter — PR #13359 (gate consolidated billing)

## Agent: bug-hunter

### Findings

#### [M1] Subscription mirror clobbers `isSubscribed`/`subscriptionPlan` to false/null on every billing (re)init
- **File:** `src/composables/billing/useBillingContext.ts:165-174` (and reset at `180-204`)
- **Severity:** major
- **Category:** logic
- **Description:** The `watch(subscription, ...)` lost its old `if (!sub) return` guard and now runs with `{ immediate: true }`, writing `isSubscribed: false, subscriptionPlan: null` whenever `subscription` is null.
  Concrete failure path:
  1. `useBillingContext` is a `createSharedComposable`. At first instantiation the adapters are not yet initialized, so `subscription` is `null`. The immediate watch fires and calls `store.updateActiveWorkspace({ isSubscribed: false, subscriptionPlan: null })`.
  2. On **every workspace switch**, the `[id, type]` watch calls `resetBillingState()` which nulls `legacyBillingRef`/`workspaceBillingRef`. `activeContext` then rebuilds a fresh adapter whose `subscription` is `null`, so the `subscription` computed transitions to `null` and the mirror watch again writes `isSubscribed: false`.
  3. This overwrites the list-derived value. `createWorkspaceState` (teamWorkspaceStore.ts:71) sets `isSubscribed: workspace.type === 'personal' || !!workspace.subscription_tier` — i.e. **personal workspaces are always considered subscribed**, and subscribed team workspaces come back `true` from the list endpoint. The clobber flips them to `false` for the entire duration of the async `initialize()` fetch.
  Observable effects during that window: `useWorkspaceTierLabel` returns `null` (tier badge disappears — it early-returns on `!workspace.isSubscribed` / `!workspace.subscriptionPlan`), and any delete/downgrade gating keyed on `isSubscribed` (see `billingOperationStore.ts:167` precedent) briefly treats a subscribed workspace as unsubscribed. This is a regression vs. the pre-PR guard that never wrote a `false`/`null` mirror.
- **Suggestion:** Restore a null-guard for the *initial/unknown* state while still handling the cancellation case, e.g. only write the mirror once a subscription value has actually been resolved (skip while the context is uninitialized/loading), or keep `if (!sub) return` for `immediate` and only clear the mirror on an *explicit* transition to "no subscription" after init. At minimum, gate the write on `isInitialized.value` so a fresh/loading context does not overwrite list-derived subscription state.
- **Confidence:** High (path traceable); note the new test "clears the mirror while a fresh context has no subscription yet" documents this as intended for a *team* workspace, so there is genuine intent tension — but for personal / already-subscribed workspaces it produces wrong transient state.

#### [m1] Loss of explicit `isCloud` gate lets a dev flag override route to workspace billing off-cloud
- **File:** `src/platform/cloud/subscription/components/SubscriptionPanel.vue:32` and `src/components/dialog/content/setting/UsageLogsTable.vue:120` (via `useBillingRouting.ts:19`)
- **Severity:** minor
- **Category:** logic
- **Description:** Both sites previously computed `isCloud && flags.teamWorkspacesEnabled`. They now use `useBillingRouting().shouldUseWorkspaceBilling`, which gates only on `flags.teamWorkspacesEnabled` (+ workspace type), not `isCloud`. In normal runtime this is safe because `resolveAuthGatedFlag` returns `false` when `!isCloud`. **However**, `resolveAuthGatedFlag` (useFeatureFlags.ts:63-66) returns a `getDevOverride` value *before* the `isCloud` check. So a `ff:team_workspaces_enabled=true` dev override on a non-cloud build now yields `teamWorkspacesEnabled === true`, and with any loaded workspace `shouldUseWorkspaceBilling` becomes `true` — rendering `SubscriptionPanelContentWorkspace` / calling `workspaceApi.getBillingEvents` off-cloud, which the old explicit `isCloud &&` guard prevented.
- **Suggestion:** If off-cloud override behavior is unwanted, add `isCloud &&` inside `useBillingRouting.type` (or have `resolveAuthGatedFlag` still honor `isCloud` for these UI gates). Otherwise confirm this override path is dev-only and acceptable.
- **Confidence:** Medium (only reachable via dev override; production unaffected).

#### [m2] `resetBillingState` nulls refs that `activeContext` reads and writes within a computed getter
- **File:** `src/composables/billing/useBillingContext.ts:98-100, 180-186`
- **Severity:** minor
- **Category:** logic
- **Description:** `activeContext` is a `computed` that calls `getLegacyBilling()`/`getWorkspaceBilling()`, which *assign* to `legacyBillingRef`/`workspaceBillingRef` — refs the computed also reads. Before this PR the refs were never nulled, so the assignment happened once. Now `resetBillingState()` sets both refs to `null` on every workspace-id/type change, so after each reset the next `activeContext` evaluation mutates a reactive dependency inside its own getter. This is a mutation-in-computed smell that can trigger an extra recompute (and a Vue dev warning); it self-stabilizes after one extra pass so it is not an infinite loop, but it is fragile.
- **Suggestion:** Resolve the active adapter with an eager factory outside the computed (e.g. instantiate in `resetBillingState`/`initialize` and have the computed only *read* the refs), so the computed has no side effects.
- **Confidence:** Low.

### Notes / non-issues verified
- **Routing matrix** (`useBillingRouting.ts`) is correct for all cases: flag off → legacy; team-enabled + workspace unloaded → legacy; personal + consolidated off/missing → legacy; personal + consolidated on → workspace; team → workspace. `activeWorkspace.type` is a real `'personal' | 'team'` discriminator (workspaceTypes.ts:21). Flag defaults to `false` correctly.
- **UsageLogsTable stale-response handling** is sound: `latestLoadToken` gating, `onScopeDispose` bump, telemetry intentionally run before the token check (idempotent — `checkForCompletedTopup` clears its localStorage marker after firing, so no double-count), and `loading`/`error` are token-gated. `response?.events` safely handles `null` (topupTracker handles `undefined`/`null`). `response.total != null` / `response.totalPages != null` fix a real prior bug where a legitimate `0` was ignored.
- **`initialize()` superseded-adapter check** (`activeContext.value !== adapter`) correctly discards stale in-flight inits after a reset, since `resetBillingState` recreates adapter instances.
- **useSubscriptionDialog.ts** migration preserves behavior: personal workspaces (`isInPersonalWorkspace`) already short-circuit the owner-reactivation branch, and team → `shouldUseWorkspaceBilling` matches old `teamWorkspacesEnabled` for teams.

### Blind spots
- Exact user-visibility/duration of the [M1] mirror clobber depends on network latency and which UI surfaces read `isSubscribed`/`subscriptionPlan` live during the load window — I traced the store/label consumers but did not render the switcher.
- The `useSubscriptionDialog.test.ts` mock returns the whole `{ value }` object from the `shouldUseWorkspaceBilling` getter rather than a ref; it happens to work because production reads `.value`, but it is test-only and not a runtime bug.
- Did not assess whether other non-migrated `flags.teamWorkspacesEnabled` billing-adjacent sites (e.g. `SubscriptionSuccessWorkspace.vue`, `UnifiedPricingTable.vue`) create UX inconsistency for personal-legacy users — that is architecture-review territory, and those components only render on the workspace flow.
