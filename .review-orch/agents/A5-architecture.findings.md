# A5: Architecture Reviewer

## Agent: architecture-reviewer

### Summary judgment

The `useBillingRouting` abstraction is **well-placed and structurally sound**. It has
single, clear responsibility (select billing backend for the active workspace),
correct dependency direction (routing → `useFeatureFlags` → `remoteConfig`, and routing →
`teamWorkspaceStore`), no circular dependencies, and it genuinely centralizes the
decision: every reviewed call site now reads either `type` or `shouldUseWorkspaceBilling`
and none re-implement the personal/consolidated/team matrix. The `resolveAuthGatedFlag`
extraction is a good DRY move that unifies the two auth-gated flags. The composable form
(returning `computed`s) is the correct Vue-idiomatic fit given the reactive inputs — a
bare pure function would drop reactivity at call sites. Findings below are minor/nitpick.

### Findings

#### [m1] Decision matrix is entangled with reactive/store plumbing (weak testability seam)
- **File:** `src/composables/billing/useBillingRouting.ts:18`
- **Severity:** minor
- **Category:** architecture
- **Description:** The routing policy (the legacy/workspace truth table) is expressed
  inline inside the `computed`, so it can only be exercised by mocking `useFeatureFlags`
  and `useTeamWorkspaceStore` (see the test's two `vi.mock` blocks). The policy — a pure
  function of three booleans/enums — is the interesting, likely-to-change part; the
  reactive wiring is boilerplate. Coupling the two means the decision matrix cannot be
  unit-tested in isolation and every future rule tweak drags store/flag mocks along.
- **Suggestion:** Extract a pure `resolveBillingType(teamWorkspacesEnabled, workspaceType,
  consolidatedBillingEnabled): BillingType` and have the `computed` call it. The matrix
  gets table-driven tests with no mocking; the composable stays a thin reactive adapter.
  (Judgment call — the composable is small, so this is optional; medium confidence.)

#### [m2] Inconsistent access path to the routing decision
- **File:** `src/platform/settings/composables/useSettingUI.ts:56`
- **Severity:** minor
- **Category:** architecture
- **Description:** Most call sites read the routing decision from `useBillingRouting`
  directly, but `useSettingUI` pulls `type` out of `useBillingContext` instead. The value
  is identical (context re-exports routing's `type`), but two access paths to the declared
  "single source of truth" is a consistency smell: a reader can't tell whether the
  difference is meaningful, and it makes `useBillingContext`'s public surface the de-facto
  routing API for this consumer. It happens to be free here because `useSettingUI` already
  needs `isActiveSubscription` from the context.
- **Suggestion:** Read `type` from `useBillingRouting()` here too (keep `useBillingContext`
  for `isActiveSubscription`), so routing decisions consistently originate from the routing
  composable. Low confidence — reasonable people differ on "already have the handle, reuse
  it."

#### [N1] Redundant dual representation in the public surface (`type` + `shouldUseWorkspaceBilling`)
- **File:** `src/composables/billing/useBillingRouting.ts:35`
- **Severity:** nitpick
- **Category:** architecture
- **Description:** `BillingType` is binary, so `shouldUseWorkspaceBilling` is exactly
  `type === 'workspace'` — two representations of one bit exposed from the same composable
  (cf. the guideline to minimize a composable's exported surface). Both do have real
  consumers (`type` for adapter/legacy-check discriminant, the boolean for pure
  workspace/legacy toggles), which is why this stays a nitpick rather than minor.
- **Suggestion:** Acceptable as-is given both are used. If trimming, keep `type` as the
  canonical value and let the handful of boolean sites compare inline, or document that the
  boolean is a pure convenience projection. Low confidence.

#### [N2] Call sites now rely on `teamWorkspacesEnabled` implicitly folding in `isCloud`
- **File:** `src/platform/cloud/subscription/components/SubscriptionPanel.vue:32`
- **Severity:** nitpick
- **Category:** architecture
- **Description:** Call sites dropped their explicit `isCloud && flags.teamWorkspacesEnabled`
  guard (also in `UsageLogsTable.vue`) and now trust `shouldUseWorkspaceBilling`. This is
  correct only because `resolveAuthGatedFlag` returns `false` off-cloud — i.e. the `isCloud`
  contract moved from explicit at the call site to implicit inside the flag getter. It's a
  cleaner design (one place owns the cloud gate), but it's now an undocumented invariant: a
  future change to how the flag resolves would silently re-route off-cloud builds.
- **Suggestion:** No code change needed; the centralization is the right call. Consider a
  one-line note on `useBillingRouting` that "off-cloud → legacy" is guaranteed by the
  auth-gated flag, so the invariant is discoverable. Low confidence.

### Confidence & blind spots
- Overall confidence in the structural assessment: **High** — the diff is self-contained
  and the centralization claim checks out across all call sites in the changeset.
- Blind spots: I did not assess the correctness of the race-condition/token logic in
  `UsageLogsTable.vue`/`useBillingContext.ts` (that's correctness/concurrency — other
  agents), nor test quality of the mocks (e.g. the `useSubscriptionDialog.test` mock
  shape), nor performance of un-memoized per-call `computed` instances.
