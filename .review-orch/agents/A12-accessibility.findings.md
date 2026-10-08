## Agent: accessibility

### Findings

#### [m1] New error-fallback text is not announced to screen readers
- **File:** `src/components/dialog/content/setting/UsageLogsTable.vue:7`
- **Severity:** minor
- **Category:** accessibility
- **WCAG:** 4.1.3 Status Messages (AA)
- **Confidence:** low-medium
- **Description:** The PR adds/expands the error paths that populate `error.value` (new localized fallbacks `credits.loadEventsError` / `credits.loadEventsUnknownError`, plus a new `watch(shouldUseWorkspaceBilling)` that can surface an error after a route flip). This text renders in the pre-existing `<Message severity="error" :closable="false">{{ error }}</Message>`. PrimeVue's `Message` does not set `role="alert"`/`aria-live` by default, so when the error appears dynamically (or replaces the spinner/table after a background reload) screen-reader users get no announcement — the failure is conveyed visually only. The container markup itself is pre-existing (untouched by the diff), so this is an enhancement directly tied to the new error-fallback text the PR introduces rather than a regression.
- **Suggestion:** Add a live region so the dynamically-injected error is announced, e.g. wrap in `<div role="alert">` or pass `role="alert"` via the Message `pt`: `<Message severity="error" :closable="false" role="alert">{{ error }}</Message>`.

### Notes (evaluated, no issue)
- `SubscriptionPanel.vue:21` — only the `v-if` binding value changed (`teamWorkspacesEnabled` → `shouldUseWorkspaceBilling`); the conditional structure and both content branches are unchanged. No a11y impact.
- `TopUpCreditsDialogContentLegacy.vue` — script-only change (settings-panel routing). No markup change, no a11y surface.
- `UsageLogsTable.vue` error text values are localized, actionable, and text-based (not color-only); the info-circle icon button already carries `:aria-label`. Concurrency-guard changes are logic-only.
