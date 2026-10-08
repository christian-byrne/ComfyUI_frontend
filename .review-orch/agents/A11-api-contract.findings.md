## Agent: api-contract

### Summary

The change is additive and backward-compatible. No public exports were removed or renamed, no window-exposed/extension-facing surface is touched, and the new server flag is optional. The composable contracts (`useFeatureFlags`, `useBillingContext`, new `useBillingRouting`) are clean. Only two nitpicks below.

### Backward-compatibility confirmations (no action needed)

- `RemoteConfig.consolidated_billing_enabled?: boolean` (`src/platform/remoteConfig/types.ts:114`) is **optional** — existing `RemoteConfig` literals (including the E2E `BOOT_FEATURES satisfies RemoteConfig`) keep compiling. Backward-compatible. The `useStorage` key in `remoteConfig.ts:63` is pinned to the enum value via `satisfies` template-literal type, so key/enum drift is compile-checked.
- `useFeatureFlags` return shape is a pure addition: new `consolidatedBillingEnabled` getter added to the `flags` reactive; `{ flags: readonly(flags), featureFlag }` unchanged. No existing consumer breaks.
- `useBillingContext` return shape is unchanged. Although the internal `type` computed was deleted, `type` is still returned (`useBillingContext.ts:283`) and still typed `ComputedRef<BillingType>` (`types.ts:107`); it now sources from `useBillingRouting`. Consumers such as `useSettingUI` (`const { type: billingType } = useBillingContext()`) continue to resolve. `BillingType` remains exported from `./types`.
- New `useBillingRouting` is a single clean named export returning `{ type: ComputedRef<BillingType>, shouldUseWorkspaceBilling: ComputedRef<boolean> }`. All four real consumers (`SubscriptionPanel.vue`, `useSubscriptionDialog.ts`, `UsageLogsTable.vue`, `TopUpCreditsDialogContentLegacy.vue`) consistently read `.value`, matching the ref contract.
- The migration of call sites from `flags.teamWorkspacesEnabled` to `shouldUseWorkspaceBilling` changes *behavior* for personal workspaces (intended feature), not the *shape* of any exported interface. All affected sites are internal composables/components, not part of the extension/window API surface.

### Findings

#### [N1] Storybook `useFeatureFlags` mock is a partial stub of the real return type
- **File:** `src/storybook/mocks/useFeatureFlags.ts:32`
- **Severity:** nitpick
- **Category:** api-contract
- **Description:** The task asks whether the storybook mock is kept in sync. For the new field it **is** — `consolidatedBillingEnabled: true` was added alongside `teamWorkspacesEnabled: true`. However the mock has always been a minimal partial: it returns only `{ flags: { teamWorkspacesEnabled, consolidatedBillingEnabled } }`, omitting the `featureFlag` function and ~17 other flags the real composable exposes. Any story rendering a component that reads a different flag or calls `featureFlag(...)` through the aliased mock would get `undefined`/throw. This divergence is pre-existing (not introduced or worsened by this PR), so it is informational only.
- **Suggestion:** Optional: broaden the mock to include `featureFlag` and default the remaining flags to `false`, or derive it from the real flag list, so future flag additions don't require manual sync. Not required for this PR.
- **Confidence:** High (that the divergence exists and is pre-existing).

#### [N2] `useBillingRouting` exposes both `type` and a derivable `shouldUseWorkspaceBilling`
- **File:** `src/composables/billing/useBillingRouting.ts:33`
- **Severity:** nitpick
- **Category:** api-contract
- **Description:** The composable returns both `type` and `shouldUseWorkspaceBilling`, where `shouldUseWorkspaceBilling === (type.value === 'workspace')`. This is minor exported-surface duplication (AGENTS.md: "minimize the surface area of each composable"). It is justified in practice — `useBillingContext` needs `type` (three-way `legacy`/`workspace` plus `getMaxSeats`/`isLegacyTeamPlan` logic) while the UI sites only need the boolean — so both are genuinely consumed. No change strictly required.
- **Suggestion:** Acceptable as-is given both are used; only worth collapsing if a future caller could compute the boolean at the call site cheaply.
- **Confidence:** High.
