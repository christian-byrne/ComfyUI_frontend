## Agent: error-handling

### Findings

#### [m1] Raw backend `err.message` surfaced to user despite localized-fallback commit
- **File:** `src/components/dialog/content/setting/UsageLogsTable.vue:197-198`
- **Severity:** minor
- **Category:** error-handling
- **Description:** The commit "localize usage-log load error fallbacks" localizes only the non-`Error` branch. When a real `Error` is thrown (network failure, backend 5xx, aborted fetch), the ternary still shows `err.message` verbatim in the PrimeVue error `Message`. Those messages are typically technical and non-localized (e.g. "Failed to fetch", "Request failed with status code 500"), which contradicts the commit's intent and the `src/AGENTS.md` "user-friendly and actionable messages" rule. Failure scenario: getBillingEvents rejects with a low-level fetch error → user sees a raw English/technical string instead of the actionable localized fallback.
- **Suggestion:** Show `t('credits.loadEventsUnknownError')` (or a dedicated key) for the `Error` branch too, and keep `console.error('Error loading events:', err)` for the raw detail. Reserve surfacing `err.message` only when it is known to be a curated, user-facing message.
- **Confidence:** medium

#### [m2] Workspace-flow load failure surfaces the legacy service's error ref
- **File:** `src/components/dialog/content/setting/UsageLogsTable.vue:191-194`
- **Severity:** minor
- **Category:** error-handling
- **Description:** The `else` (null response) branch always reads `customerEventService.error.value` for the message, even when the request came from `workspaceApi.getBillingEvents` on the workspace billing flow. `customerEventService.error` is the legacy service's error state and is unrelated to the workspace API; after a mid-session route flip it can be stale (set by a prior legacy load) or null. Failure scenario: on the workspace flow `workspaceApi.getBillingEvents` resolves to a falsy/empty response → the UI may show a stale legacy error string, or (if never set) fall through to the generic key while the actual workspace-side failure detail is lost.
- **Suggestion:** Only consult `customerEventService.error.value` on the legacy path (`!shouldUseWorkspaceBilling.value`); otherwise use the localized fallback directly, or read the corresponding workspace-API error source.
- **Confidence:** low

#### [N1] Non-401/403 error responses in remote-config fetch don't mark `remoteConfigState = 'error'`
- **File:** `src/platform/remoteConfig/refreshRemoteConfig.ts:70-75`
- **Severity:** nitpick
- **Category:** error-handling
- **Description:** Pre-existing (untouched by this PR, noted because the review brief asks about config-fetch failure). For a non-ok response that is not 401/403 (e.g. 500/502/404), the code logs a warning but leaves `remoteConfig` and `remoteConfigState` unchanged — state is not set to `'error'`. Net effect on billing routing is still SAFE: `resolveAuthGatedFlag` gates on `isAuthenticatedConfigLoaded` (true only for `'authenticated'`), so a failed authenticated refresh leaves state at `'anonymous'`/`'unloaded'`/`'error'`, which falls back to the cached session value or `false` → legacy billing. So a config-load failure degrades gracefully to legacy (or the last cached session value), as intended. The only gap is observability: a 5xx never reaches the `'error'` state label.
- **Suggestion:** Set `remoteConfigState.value = 'error'` (and optionally clear `remoteConfig`) on any non-ok response, not just 401/403, so downstream state reflects the failure.
- **Confidence:** medium

### Notes (verified, no finding)
- **Graceful degradation on config failure is correct.** `resolveAuthGatedFlag` (`useFeatureFlags.ts:58-70`) returns `false` off-cloud, and during the auth window / on error returns `cachedValue ?? false`. `useBillingRouting` returns `'legacy'` whenever `teamWorkspacesEnabled` is false or the workspace type is unresolved. So a failed/absent remote config routes personal workspaces to legacy billing rather than erroring.
- **No empty catches / swallowed data-mutation errors.** All `catch` blocks in the changed code log via `console.error` and set user-facing `error` state or re-throw. `UsageLogsTable` stale-token early-returns in `catch`/`finally` are intentional (superseded load) and cannot leave a stuck spinner (latest token owns `loading`).
- **`checkForCompletedTopup` cannot throw.** Moving the telemetry call before the response-handling block (`UsageLogsTable.vue:167`) looked risky (a throw would discard successfully-fetched events and show an error), but `TelemetryRegistry.checkForCompletedTopup` wraps each provider dispatch in try/catch (`TelemetryRegistry.ts:130-135`) and returns `false`, so it never propagates — no regression.
- **`useBillingContext.initialize` (`useBillingContext.ts:206-222`) handles the superseded-adapter race correctly:** stale success/error paths early-return without mutating state or masking; real errors set `error.value` and re-throw.
</content>
</invoke>
