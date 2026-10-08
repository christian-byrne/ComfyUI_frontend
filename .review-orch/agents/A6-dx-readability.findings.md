## Agent: dx-readability

### Findings

#### [m1] `useBillingRouting` exposes two complementary views of the same bit (`type` + `shouldUseWorkspaceBilling`)
- **File:** `src/composables/billing/useBillingRouting.ts:33-35`
- **Severity:** minor
- **Category:** dx
- **Description:** `BillingType` has exactly two members (`'legacy' | 'workspace'`), so `shouldUseWorkspaceBilling` is literally `type.value === 'workspace'` and `!shouldUseWorkspaceBilling` ⟺ `type.value === 'legacy'` — zero extra information. Tracing "how is billing mode decided" now follows two parallel channels: every UI call site (`SubscriptionPanel`, `useSubscriptionDialog`, `UsageLogsTable`, `TopUpCreditsDialogContentLegacy`) reads the boolean, while `useBillingContext` reads `type` and re-exposes it to `useSettingUI`. A reader must know the two names are equivalent. Confirmed by grep: `type` has exactly one consumer (`useBillingContext`, for adapter selection); all others use the boolean.
- **Suggestion:** Is the discriminated string earning its keep today, or is it kept for a hypothetical third billing type (YAGNI)? If the latter, would returning only `shouldUseWorkspaceBilling` and letting `useBillingContext` derive its ternary from the boolean collapse the two channels into one? (Non-blocking — the split is defensible if a third type is imminent.)
- **Confidence:** Medium

#### [N1] `type` is a generic name; one consumer already renames it to `billingType`
- **File:** `src/composables/billing/useBillingRouting.ts:35`, `src/platform/settings/composables/useSettingUI.ts:56`
- **Severity:** nitpick
- **Category:** dx
- **Description:** The composable returns `type`, but `useSettingUI` destructures it as `type: billingType` — the one call site that consumes it found the bare name too generic to live with. `useBillingContext` keeps the bare `type`. Inconsistent naming for the same value across the two consumers.
- **Suggestion:** Would naming it `billingType` at the source remove the need for the alias and read more clearly at both consumers?
- **Confidence:** Low

#### [N2] Flag string is centralized in product code; only the storybook mock duplicates it (answers the review question)
- **File:** `src/storybook/mocks/useFeatureFlags.ts:29,36`
- **Severity:** nitpick
- **Category:** dx
- **Description:** Informational. The magic string `consolidated_billing_enabled` is well-centralized in product code: declared once in the `ServerFeatureFlag` enum, and the wire-key literals in `remoteConfig.ts` and `refreshRemoteConfig`/`useFeatureFlags` are tied back to the enum via `satisfies \`${ServerFeatureFlag.CONSOLIDATED_BILLING_ENABLED}\``, so a rename fails typecheck. The only duplication is the storybook mock, which hand-copies the entire enum + a `consolidatedBillingEnabled: true` flag with no `satisfies` link — it silently drifts if the real flag is renamed. This PR did keep it in sync, and it's a pre-existing mock-maintenance pattern, so nothing to change here.
- **Suggestion:** None required. Flagged only to close out "is the flag name centralized or duplicated?" — centralized where it matters.
- **Confidence:** High

#### [N3] Duplicated error-log string between `loadEvents` catch and the new routing watch
- **File:** `src/components/dialog/content/setting/UsageLogsTable.vue:217-220`
- **Severity:** nitpick
- **Category:** dx
- **Description:** The new `watch(shouldUseWorkspaceBilling, ...)` logs `console.error('Error loading events:', error)`, the same literal already emitted inside `loadEvents`'s own catch (line ~197). On a failed route-flip refresh, both fire, so the same message can log twice for one failure. Minor noise, not misleading.
- **Suggestion:** Since `refresh()` → `loadEvents()` already catches and logs, is the outer `.catch` here redundant? A bare `void refresh()` (or letting `loadEvents` own the logging) would avoid the double log. (Non-blocking; the extra catch also guards the floating promise, so keep some handler.)
- **Confidence:** Low

### Positive notes (not findings)
- `resolveAuthGatedFlag` cleanly extracts the isCloud / auth-window / cached-fallback logic previously inlined in `teamWorkspacesEnabled`; both flags now share one well-documented path. Good de-duplication.
- The non-obvious concurrency logic (`latestLoadToken` in `UsageLogsTable.vue`, adapter-supersede check in `useBillingContext.ts`) carries "why" comments, not "what" comments — appropriate.
- The `useBillingContext` docblock and the removed-stale-comment cleanup keep the flag matrix description in sync with the moved logic.

### Blind spots
- I did not assess concurrency correctness of the token/adapter-supersede patterns (A-correctness/regression scope) — only their readability.
- Test files were reviewed only for naming consistency with the renamed flag, not for coverage adequacy.
