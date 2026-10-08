## Agent: test-quality

### Summary

The routing matrix is genuinely well covered. `useBillingRouting.test.ts` exercises every branch of the `type` computed (team-workspaces off, personal + consolidated off, personal + consolidated on, team, and workspace-not-loaded → null). `useBillingContext.test.ts` runs the **real** `useBillingRouting` (only flags + store are mocked), so the flag→type→backend wiring is integration-tested, and it covers the mid-session flip (`consolidated billing flips on`) and the subscription-mirror clear path. The two `UsageLogsTable` concurrency tests (stale-response discard, telemetry-before-guard) are strong behavioral tests that would fail if the token guard or telemetry ordering regressed. `useFeatureFlags.test.ts` covers the auth-window / cached / remoteConfig / server-fallback resolution paths and the off-cloud + dev-override cases. No mock-echo or lazy-error anti-patterns of concern.

Gaps below are narrow and tied to specific untested paths.

### Findings

#### [MINOR1] `shouldUseWorkspaceBilling` (the actually-consumed export) is only asserted in its negative case
- **File:** `src/composables/billing/useBillingRouting.test.ts:57` (and 67)
- **Severity:** minor
- **Category:** test
- **Description:** `shouldUseWorkspaceBilling` is the export consumed by all four rewired sites (`SubscriptionPanel`, `useSubscriptionDialog`, `UsageLogsTable`, `TopUpCreditsDialogContentLegacy`). It is asserted `false` only once (line 44, the legacy/disabled case). The two workspace-positive cases (personal+consolidated-on line 57-65, team line 67-75) assert only `type.value === 'workspace'` and never assert `shouldUseWorkspaceBilling.value === true`. A regression turning the derivation into e.g. always-`false` would pass every test (the single negative assertion still holds).
- **Suggestion:** Add `expect(shouldUseWorkspaceBilling.value).toBe(true)` to the two workspace-positive tests (or table-drive the matrix asserting both `type` and `shouldUseWorkspaceBilling` per row).

#### [MINOR2] Team + `consolidatedBillingEnabled: true` cell of the matrix is untested
- **File:** `src/composables/billing/useBillingRouting.test.ts:67`
- **Severity:** minor
- **Category:** test
- **Description:** The test titled "uses workspace billing for team workspaces regardless of consolidated billing" only verifies the flag **off**. The "regardless" claim (team routes to workspace whether the flag is on or off) is half-verified; the team + flag-on cell is never asserted.
- **Suggestion:** Add a second assertion (or duplicate row) with `mockFlags.consolidatedBillingEnabled = true` and team workspace, expecting `type.value === 'workspace'`.

#### [MINOR3] `TopUpCreditsDialogContentLegacy` `handleBuy` panel-selection change has no test
- **File:** `src/components/dialog/content/TopUpCreditsDialogContentLegacy.vue:51`
- **Severity:** minor
- **Category:** test
- **Description:** `handleBuy` switched the post-purchase settings panel from `flags.teamWorkspacesEnabled` to `shouldUseWorkspaceBilling.value` (`'workspace'` vs `'subscription'`/`'credits'`). No test file exists for this component, so the behavioral change — specifically that a personal workspace with consolidated billing **off** now correctly lands on the legacy panel rather than the workspace panel — is unverified. This is the exact regression this PR is meant to prevent, left unguarded at the call site.
- **Suggestion:** Add a small test (or component test) asserting the chosen `settingsPanel` for `shouldUseWorkspaceBilling` true vs false.

#### [MINOR4] `SubscriptionPanel.vue` routing change not exercised by its existing (untouched) test
- **File:** `src/platform/cloud/subscription/components/SubscriptionPanel.test.ts:1`
- **Severity:** minor
- **Category:** test
- **Description:** `SubscriptionPanel.vue` changed its content `v-if` from `isCloud && flags.teamWorkspacesEnabled` to `shouldUseWorkspaceBilling`. The test was not updated and mocks neither `useBillingRouting` nor its deps; the real composable runs with off-cloud defaults, so only the legacy branch (`SubscriptionPanelContentLegacy`) ever renders. The workspace-vs-legacy fork controlled by the changed condition is never asserted, so a mis-wire of `shouldUseWorkspaceBilling` into the template would not be caught here.
- **Suggestion:** Mock `useBillingRouting` and add a case toggling `shouldUseWorkspaceBilling` to assert `SubscriptionPanelContentWorkspace` vs `SubscriptionPanelContentLegacy` renders.

#### [NIT1] Team-workspaces-off guard only tested with a team workspace
- **File:** `src/composables/billing/useBillingRouting.test.ts:37`
- **Severity:** nitpick
- **Category:** test
- **Description:** The first guard (`!teamWorkspacesEnabled → legacy`) is only tested with `activeWorkspace = team`. The personal + team-workspaces-off combination is never asserted. Same branch, low value, but it is a real matrix cell left blank.
- **Suggestion:** Optional: add a personal + team-workspaces-off row (or fold into a matrix table).

#### [NIT2] `useSubscriptionDialog` billing-routing mock returns the raw hoisted object via a getter
- **File:** `src/platform/cloud/subscription/composables/useSubscriptionDialog.test.ts:36`
- **Severity:** nitpick
- **Category:** test
- **Description:** The mock's `get shouldUseWorkspaceBilling()` returns the whole `{ value }` object rather than a ref/computed. It happens to work because production reads `.value`, but the getter indirection is dead ceremony and diverges from the real composable's shape (a `ComputedRef`); it would silently mask a production change from `.value` access to direct-ref usage.
- **Suggestion:** Return a plain `computed`/`ref` matching the real signature, e.g. `useBillingRouting: () => ({ shouldUseWorkspaceBilling: mockShouldUseWorkspaceBilling })` with `mockShouldUseWorkspaceBilling` a real ref.
