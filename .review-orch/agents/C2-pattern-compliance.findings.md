# C2: Pattern Compliance

## Agent: pattern-compliance

### Summary

This PR is highly compliant with repository conventions. The new feature flag
is wired through the exact same abstraction the PR introduces for the existing
flag, i18n keys land in the correct namespace, type imports are separated, no
`any`/`as any`, and the new composable follows `useXyz.ts` placement/naming.
Only minor test-mock consistency nitpicks below.

### Verified compliant (no action needed)

- **Feature-flag access pattern.** `consolidatedBillingEnabled` reads through the
  new `resolveAuthGatedFlag()` helper, and the PR refactors the sibling
  `teamWorkspacesEnabled` getter to use the same helper — so both auth-gated
  flags now resolve identically (`useFeatureFlags.ts:923-935, 940-978`). Wire
  key `consolidated_billing_enabled` added consistently to `ServerFeatureFlag`
  enum, `RemoteConfig` type, `cachedConsolidatedBillingEnabled` storage, and
  `refreshRemoteConfig`. Storybook mock kept in sync.
- **Composable naming/structure.** `useBillingRouting.ts` under
  `src/composables/billing/`, `useXyz` name, single-source-of-truth doc comment,
  minimal exported surface (`{ type, shouldUseWorkspaceBilling }`). No barrel
  file. Consistent with `useBillingContext.ts` sibling.
- **i18n.** New keys `credits.loadEventsError` / `credits.loadEventsUnknownError`
  in `src/locales/en/main.json`, camelCase, correct `credits` namespace
  (alongside existing `model`/`added`/`accountInitialized`); consumed via
  `t('credits.…')`. This change actually *removes* two hardcoded English strings
  (`'Failed to load events'`, `'Unknown error'`), improving i18n compliance.
- **Type imports separated.** `import type { Ref } from 'vue'` and
  `import type { BillingType } from './types'` are standalone (AGENTS.md rule).
- **Vue conventions.** `<script setup lang="ts">`, `computed` for derived
  routing, `watch` used for a genuine side effect (refresh on route flip), no
  new refs where a computed suffices. No explicit return type on
  `useBillingRouting` — consistent with the dominant composable pattern
  (`useFeatureFlags`, `useErrorHandling`, etc. also omit it), so not flagged.
- **Comments.** Added comments explain *why* (concurrency / mid-fetch route
  flips, superseded loads), not *what* — permitted by the "explain why" rule and
  non-trivial enough to earn their keep.
- **`.catch((error) =>` in new watch** (`UsageLogsTable.vue:218`) shadows the
  outer `error` ref, but mirrors the pre-existing identical pattern at
  `UsageLogsTable.vue:207` in the same file — consistent, not flagged.

### Findings

#### [N1] Inconsistent mock style for `useBillingRouting` across new test files
- **File:** `src/platform/cloud/subscription/composables/useSubscriptionDialog.test.ts:59-65`
- **Severity:** nitpick
- **Category:** style / test consistency
- **Description:** The two new test files mock `useBillingRouting` differently.
  `UsageLogsTable.test.ts:90-102` returns a real Vue `ref` fronted by an
  `Object.defineProperty` getter/setter (reactive — needed because the component
  `watch`es the value). `useSubscriptionDialog.test.ts` instead returns the
  hoisted plain `{ value }` object via a getter, so `shouldUseWorkspaceBilling`
  is a non-reactive object masquerading as a ref. Both pass (the dialog code
  reads `.value` once, no watch), but the divergent styles for mocking the same
  composable make the suite harder to read.
- **Suggestion:** Mirror the reactive `ref`-based mock used in
  `UsageLogsTable.test.ts` (and in `useBillingContext.test.ts`) so all
  `useBillingRouting` mocks share one idiom. Low priority.

#### [N2] `ServerFeatureFlag` enum ordering differs between source and storybook mock
- **File:** `src/storybook/mocks/useFeatureFlags.ts:26`
- **Severity:** nitpick
- **Category:** style
- **Description:** In `src/composables/useFeatureFlags.ts:35`
  `CONSOLIDATED_BILLING_ENABLED` is inserted before `SIGNUP_TURNSTILE`; in the
  storybook mock it is appended after `UNIFIED_CLOUD_AUTH`. Cosmetic only (the
  mock enum is a partial hand-maintained copy), but keeping member order aligned
  eases future diffing between the real enum and its mock.
- **Suggestion:** Match member ordering to the source enum. Trivial.

### Confidence

High. All conventions checked against sibling code in the same directories
(`useFeatureFlags.ts`, `useBillingContext.ts`, the two other `useBillingRouting`
mocks) and against AGENTS.md/CLAUDE.md. Findings are low-severity style only;
no blocking pattern violations found.
