feat(billing): gate consolidated billing behind consolidated_billing_enabled flag by huntcsg
## Summary

Shields personal-workspace billing code paths behind the new `consolidated_billing_enabled` feature flag so they fall back to the **legacy** billing flow while the flag is `false`. Team workspaces are unaffected and continue to use the workspace-scoped billing flow.

## Changes

- Add `consolidatedBillingEnabled` to `useFeatureFlags` (reads the `consolidated_billing_enabled` server flag / remote config, defaults to `false`) and to the `RemoteConfig` type.
- New `useBillingRouting` composable — a single source of truth for whether the active workspace uses the workspace vs. legacy billing flow:
  - team workspaces disabled → legacy
  - personal workspace + consolidated billing off/missing → legacy
  - personal workspace + consolidated billing on → workspace
  - team workspace → workspace
  - workspace not loaded yet → legacy
- Route `useBillingContext` and the affected UI sites (`SubscriptionPanel`, `useSubscriptionDialog`, `UsageLogsTable`, `TopUpCreditsDialogContentLegacy`) through `useBillingRouting` instead of keying on `teamWorkspacesEnabled` directly.
- Update the storybook `useFeatureFlags` mock to stay in sync.

## Testing

- `pnpm test:unit` for `useBillingRouting`, `useBillingContext`, `useSubscriptionDialog`, and `UsageLogsTable` (new + updated coverage for the routing matrix). Remaining quality gates (`typecheck`, `lint`) are being verified in CI.

## Related

Requires the backend PR that adds the `consolidated_billing_enabled` flag to `/api/features`.
