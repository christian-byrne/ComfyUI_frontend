# Agent: C1 Regression Risk

Base ref: `origin/main` (merge-base `9cf5c9a9`). PR commits verified and excluded from blame attribution.

Scope: does replacing `teamWorkspacesEnabled` checks with `useBillingRouting` preserve prior semantics at every call site? Focus on personal-flag-false (must match prior legacy), team (must be UNCHANGED), and the "workspace not loaded" transitional window.

## Mapping summary

Old checks were of two forms: `flags.teamWorkspacesEnabled` (raw) or `isCloud && flags.teamWorkspacesEnabled`. New `shouldUseWorkspaceBilling` = `teamWorkspacesEnabled` flag **AND** `activeWorkspace` loaded **AND** (`type==='team'` OR `consolidatedBillingEnabled`).

- `isCloud` gate is safely subsumed: `flags.teamWorkspacesEnabled` already returns `false` off-cloud, so dropping the explicit `isCloud &&` in `UsageLogsTable`/`SubscriptionPanel` is equivalent.
- For a **team** workspace once loaded: `shouldUseWorkspaceBilling === teamWorkspacesEnabled` — equivalent. Divergence exists ONLY in the transitional window (Finding 2).
- For **personal** flag-on / consolidated-off: intentional change to legacy (this is the PR's purpose, not a regression) — but see Finding 3 for a site that was NOT migrated.

---

### Findings

#### [MAJOR-1] Subscription→workspace-store mirror now clobbers team state with a transient `isSubscribed:false`
- **File:** `src/composables/billing/useBillingContext.ts:165-172`
- **Prior behavior:** `watch(subscription, (sub) => { if (!sub) return; store.updateActiveWorkspace({...}) }, {immediate:true})`. The `if (!sub) return` guard (base line 178, last touched by `e3049e7c31` "feat(billing): single billing path", the same commit that deliberately reworked this D3 mirror) meant a null subscription NEVER wrote to the workspace store — last-known subscription state was preserved during load/transition.
- **New behavior:** guard removed; null now writes `{ isSubscribed:false, subscriptionPlan:null }`. Combined with the new `resetBillingState()` (line ~188) that nulls `legacyBillingRef`/`workspaceBillingRef`, the `subscription` computed transiently becomes null on **every** workspace-id change and every `type` flip, firing the watch and clearing the mirror.
- **Regression scenario (team, must be UNCHANGED):** a team user switching workspaces (or when authenticated config resolves and `type` flips) now momentarily writes `isSubscribed:false`/`plan:null` into `teamWorkspaceStore.activeWorkspace`. Per the mirror's own comment this drives the workspace-switcher "subscribed" display and enables the delete-workspace button "even before the period ends" — so the delete button can briefly flip to enabled and the subscribed badge can flicker off until reinit reloads the real subscription. Base code avoided this via the guard.
- **Suggestion:** Confirm store consumers tolerate a transient `false`, or restore a guard that skips the write while `isLoading`/uninitialized rather than writing `false`. The new test "clears the mirror while a fresh context has no subscription yet" locks in the changed behavior for team workspaces — verify that is truly intended.
- **Confidence:** Medium. The behavior change is certain (confirmed by new test); the user-visible harm depends on how eagerly switcher/delete-button consumers react to the transient value.

#### [MAJOR-2] Transitional "workspace not loaded" window is NOT equivalent for team users
- **File:** `src/composables/billing/useBillingRouting.ts:23-24` (consumed by `useBillingContext.ts`, `UsageLogsTable.vue`, `SubscriptionPanel.vue`, `TopUpCreditsDialogContentLegacy.vue`, `useSubscriptionDialog.ts`)
- **Prior behavior:** `useBillingContext.type = flags.teamWorkspacesEnabled ? 'workspace' : 'legacy'` did NOT depend on the workspace object. A returning team user whose `cachedTeamWorkspacesEnabled` is `true` got `type==='workspace'` immediately at setup, before `activeWorkspace` loaded.
- **New behavior:** `if (!workspaceType) return 'legacy'` forces `type==='legacy'` until `activeWorkspace?.type` is populated. So for the same cached team user the route is now `legacy` → then flips to `workspace` once the workspace loads.
- **Regression scenario (team):** during the transitional window every migrated site behaves as legacy: `useBillingContext` runs a legacy `/customers/*` init (extra call, and a legacy error can transiently set `error.value`); `UsageLogsTable` fires `customerEventService.getMyEvents` before flipping to `workspaceApi.getBillingEvents`; `SubscriptionPanel` briefly renders `SubscriptionPanelContentLegacy`; the settings layout can transiently expose the legacy plan panel. Base never touched the legacy path for team users at all. The PR mitigates the fallout (reset+reinit watch, `latestLoadToken` race guard, `watch(shouldUseWorkspaceBilling)` refresh), but the transient legacy hit itself is new team behavior.
- **Suggestion:** This is a deliberate "don't eagerly route to workspace billing" tradeoff; confirm the extra legacy `/customers` init and the UI flash are acceptable for cached team users, or gate the unloaded default on whether team-workspace init is already known-pending rather than blanket legacy.
- **Confidence:** Medium-high that behavior differs in the transitional window; medium on severity (mostly transient, partly mitigated).

#### [MAJOR-3] `CurrentUserButton` popover was NOT migrated — personal/legacy users get the workspace popover, not the legacy one
- **File:** `src/components/topbar/CurrentUserButton.vue:52,58,93` (renders `CurrentUserPopoverWorkspace` which reads `useBillingContext` for `subscription`/`balance`/credits at `CurrentUserPopoverWorkspace.vue:273-277`)
- **Prior behavior (goal):** requirement is that a personal-workspace user with `consolidatedBillingEnabled` false matches the PREVIOUS legacy behavior. The PR migrated `SubscriptionPanel`, `UsageLogsTable`, `TopUpCredits`, `useSubscriptionDialog`, `useBillingContext` to `shouldUseWorkspaceBilling`, but the topbar popover still keys on raw `flags.teamWorkspacesEnabled`.
- **New behavior / inconsistency:** for personal + flag-on + consolidated-off, `SubscriptionPanel` now shows `SubscriptionPanelContentLegacy` while the topbar still shows `CurrentUserPopoverWorkspace` (workspace-shell UI, unified credits/upgrade CTAs). Billing DATA is legacy-correct (via unified `useBillingContext`), but the surface is workspace-flavored — diverging from pre-consolidation legacy and inconsistent with the migrated panel.
- **Regression scenario:** personal user on the legacy flow sees a unified/workspace credits popover ("Add credits"/"upgrade to add credits") in the topbar that no longer matches the legacy subscription panel they get in Settings.
- **Suggestion:** Decide whether the popover is billing UI (then migrate to `shouldUseWorkspaceBilling`) or workspace-identity chrome (then document the intentional split). Same question applies to the still-raw checks in `useSettingsDialog.ts:25` (workspace-mode settings shell) — that one is covered by the new `shouldShowLegacyPlanCreditsPanel` fix, so it is OK, but the popover is not.
- **Confidence:** Medium. Real new inconsistency; whether it is a defect depends on product intent for the popover (PR description does not list it).

#### [MINOR-4] Top-up completion telemetry can double-fire for team users during the transitional double-fetch
- **File:** `src/components/dialog/content/setting/UsageLogsTable.vue:167`
- **Prior behavior:** `checkForCompletedTopup(response.events)` ran only inside the `if (response)` success block, once per successful load (base line 176-177, added by `72389637ed`, Benjamin Lu — a feature line, not a bugfix).
- **New behavior:** `useTelemetry()?.checkForCompletedTopup(response?.events)` now runs before the `loadToken` staleness check, i.e. it runs even for a superseded response (explicitly asserted by the new test "runs top-up completion telemetry for a superseded response"). On the transitional route flip (legacy load in flight, then workspace load wins) both responses invoke the completion check.
- **Regression scenario:** if both the legacy `/customers` events and the workspace `/api/billing` events for the same session carry a `CREDIT_ADDED`/top-up-completion, the completion handler fires twice → possible duplicate top-up-completed side effect (toast/tracking clear). Likely rare (different backends, legacy set often empty for team), but it is a new double-invocation path.
- **Suggestion:** Confirm `checkForCompletedTopup` is idempotent, or move it after the `loadToken` guard for the superseded branch while still covering the completion-carrying fetch.
- **Confidence:** Low-medium. Depends on idempotency of the telemetry handler.

---

### Notes (checked, NOT flagged)

- `useSettingUI.ts` — new `shouldShowLegacyPlanCreditsPanel` gate is a **no-op in the legacy menu tree** (that tree only renders when `teamWorkspacesEnabled` is false, where `billingType` is always `'legacy'`), and purely **additive in the workspace ("General") tree** (surfaces the legacy panel for the new personal-legacy-in-workspace-layout case). No team regression; the transient team flash requires `isActiveSubscription` true pre-billing-init, which does not occur. OK.
- `useSubscriptionDialog.ts:50` branch — guarded by `!isInPersonalWorkspace`, so it only evaluates for team, where `shouldUseWorkspaceBilling === teamWorkspacesEnabled`. Equivalent. Both dialog sites run in click handlers (workspace already loaded), so Finding 2's transient does not apply. OK.
- `UsageLogsTable.vue:181,184` — `if (response.total)` → `!= null` and `if (response.totalPages)` → `!= null`: now applies a server-returned `0`. Behavior change but an improvement (zero-count pagination), not a reverted bugfix. OK.
- `refreshRemoteConfig.ts`, `remoteConfig.ts`, `types.ts`, `useFeatureFlags.ts` — additive new flag plumbing; `resolveAuthGatedFlag` faithfully extracts the existing `teamWorkspacesEnabled` resolution logic (verified line-for-line against base). OK.
</content>
</invoke>
