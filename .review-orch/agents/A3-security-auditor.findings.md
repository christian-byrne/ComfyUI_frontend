## Agent: security-auditor

### Findings

No issues found.

---

### Security assessment notes (no critical/major issues)

The PR was reviewed against the security angles requested. It is defensively
written and fails safe. Summary of what was checked and why nothing rises to
critical/major:

**1. Flag fail-safe behavior — PASS (fails safe to legacy).**
`resolveAuthGatedFlag` (`src/composables/useFeatureFlags.ts:56-73`) defaults to
`false` on every path:
- Off-cloud build → `false`.
- During the auth window (authenticated config not yet loaded) → `cachedValue.value ?? false`.
- Otherwise → `remoteConfigValue ?? api.getServerFeature(flagKey, false)`.
`useBillingRouting` (`src/composables/billing/useBillingRouting.ts:16-31`) also
defaults to `legacy` when `teamWorkspacesEnabled` is off, when the workspace is
not yet loaded, and for personal workspaces until consolidated billing is on.
A missing/unavailable flag therefore keeps users on the legacy per-user billing
flow, which is the conservative default.

**2. Wrong-flow / cross-workspace billing exposure — no plausible exploit.**
The flag only selects which UI shell and which backend endpoint the user's own
authenticated client calls (legacy `/customers/*` user-scoped vs workspace
`/api/billing/*` workspace-scoped). Both endpoints are authorized server-side by
the active session token and active workspace id; a mis-evaluated client flag
cannot read another workspace's data because the backend enforces authz. The PR
additionally *adds* race protection against stale/cross-workspace state
(`useBillingContext.ts` adapter-supersession + `resetBillingState`;
`UsageLogsTable.vue` `latestLoadToken` guard), reducing the risk of a stale
response resolving for the wrong workspace.

**3. Dev-override bypass — not exploitable in production.**
`getDevOverride` (`src/utils/devFeatureFlagOverride.ts:17`) short-circuits with
`if (!import.meta.env.DEV) return undefined` and is tree-shaken out of prod
builds. The `ff:consolidated_billing_enabled` localStorage override that bypasses
the `isCloud`/auth-loaded guards works only in dev builds and only against the
user's own localStorage (no cross-user vector).

**4. Trust of remote-config values — acceptable.**
`consolidated_billing_enabled` comes from authenticated remote config /
`/api/features` (trusted backend). It is coerced with `Boolean(...)` before
caching (`refreshRemoteConfig.ts:63`) and consumed as a boolean via `??`
fallback. No injection surface.

**5. XSS / template injection — none introduced.**
`SubscriptionPanel.vue`, `UsageLogsTable.vue`, and
`TopUpCreditsDialogContentLegacy.vue` changes only swap a boolean condition
(`teamWorkspacesEnabled` → `shouldUseWorkspaceBilling`) driving `v-if` / a
settings-panel string. No `v-html`, no new user-controlled interpolation, no
`innerHTML`. New strings are i18n keys (`credits.loadEventsError`,
`credits.loadEventsUnknownError`) rendered through Vue's auto-escaping.

**6. Secrets / credentials — none.** No tokens, keys, or credentials added.

**7. Error-message leakage — pre-existing, unchanged.**
`UsageLogsTable.vue:189` still surfaces `err.message` to the UI for `Error`
instances; the PR only replaces the non-Error fallback string with a localized
one. This behavior predates the PR and is not introduced by it, so it is out of
scope as a new finding (low severity if pursued: a billing-fetch error message
shown in the panel).

### Non-blocking observation (below major bar; not counted)
`cachedConsolidatedBillingEnabled` (`remoteConfig.ts:63`, localStorage via
`useStorage`) is written on authenticated refresh but is not cleared on logout —
same established pattern as the pre-existing `cachedTeamWorkspacesEnabled`. On a
shared browser, the next user's brief auth window could read the prior user's
cached routing flag. Impact is limited to which billing UI/endpoint the *new*
user's own authenticated client hits (backend still authorizes data by the new
session), and it self-corrects once authenticated config loads. This is a
defense-in-depth nit, not an exploitable data-exposure path; if the team wants
belt-and-suspenders, clear both cached flags on logout. Confidence: Low.

### Confidence
- Fail-safe defaulting (item 1): High.
- No cross-workspace data exposure (item 2): High (assumes backend enforces
  workspace/user authz on `/api/billing/*` and `/customers/*` — see blind spot).
- Dev-override non-exploitable (item 3): High.
- No XSS (item 5): High.

### Blind spots
- Backend authorization on the billing endpoints is not visible in this
  frontend diff; the "no data exposure" conclusion assumes server-side authz on
  `/api/billing/*` and `/customers/*`. If the backend trusts the client's chosen
  flow without re-checking workspace/user scope, item 2 would need re-evaluation
  (that lives in the companion backend PR referenced in the description).
- Telemetry payloads passed to `checkForCompletedTopup` were not traced to their
  sink; if that path forwards raw event data off-device, review separately.
