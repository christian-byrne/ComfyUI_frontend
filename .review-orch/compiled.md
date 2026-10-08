# Compiled Review — Comfy-Org/ComfyUI_frontend#13359

PR: feat(billing): gate consolidated billing behind consolidated_billing_enabled flag (author: huntcsg)
Base: origin/main  Head: 607b41cc2  Files: 20  (+652/-121)
Agents run: A1 CodeRabbit, A2 Bug Hunter, A3 Security, C1 Regression, A5 Architecture, A11 API Contract, C2 Pattern, A7 Test Quality, A10 Error Handling, A17 Structural, A12 A11y, A14 Vue, A6 DX

## Stats
Critical: 0 | Major: 3 (dedup 2 inline + 1 body) | Minor/Nitpick: many. Security: clean (fails safe to legacy).

## SELECTED for posting

[1] issue/question — src/composables/billing/useBillingContext.ts:169  (A2 High + C1)
Subscription mirror lost its `if (!sub) return` guard and now runs `{immediate:true}`, so a null subscription writes `isSubscribed:false, subscriptionPlan:null`. With the new `resetBillingState()` nulling adapters on every workspace-id/type change, `subscription` transiently goes null on each switch, clobbering list-derived state (personal workspaces are always-subscribed per createWorkspaceState; subscribed teams come back true). Transient effects: tier badge disappears, delete-workspace button briefly enables. A new test locks this in for team workspaces — so surface as a question about personal/subscribed intent.

[2] question (non-blocking) — src/composables/billing/useBillingRouting.ts:24  (C1 Major-2)
`if (!workspaceType) return 'legacy'` makes a returning cached-team user route legacy transiently before flipping to workspace (extra legacy /customers init + brief legacy UI flash). Prior code routed team→workspace immediately from cached flag. Deliberate tradeoff; confirm acceptable.

[3] suggestion — src/components/dialog/content/setting/UsageLogsTable.vue:193  (A10 + CodeRabbit, 2 agents)
On the workspace flow, the null-response error branch still reads `customerEventService.error.value` (legacy service state), which can be stale/unrelated. Gate the customer-event fallback on `!shouldUseWorkspaceBilling.value`.

[4] suggestion (non-blocking) — src/components/dialog/content/setting/UsageLogsTable.vue:198  (A10)
The localization commit localized only the non-Error branch; a real Error still shows `err.message` verbatim (technical, non-localized), contradicting the commit intent. Use the localized key for the Error branch too, keep console.error for detail.

[5] nitpick/question (non-blocking) — src/composables/billing/useBillingRouting.ts:33  (A17+A5+A6+A11, 4 agents)
`shouldUseWorkspaceBilling` === `type.value === 'workspace'` — two isomorphic representations of one bit. Both consumed, so defensible; gentle question on whether the string earns its keep.

[6] suggestion (non-blocking) — src/composables/billing/useBillingRouting.test.ts:64  (A7)
`shouldUseWorkspaceBilling` (the export the 4 rewired sites consume) is asserted `false` once but never `true`; positive cases assert only `type`. A regression turning it always-false would pass. Add `expect(shouldUseWorkspaceBilling.value).toBe(true)` to the workspace-positive cases. (Also: team + consolidated-on cell untested.)

[7] suggestion (non-blocking) — src/components/dialog/content/setting/UsageLogsTable.test.ts:434  (CodeRabbit)
The stale-legacy-discard test's `waitFor` can pass immediately (WorkspaceAPI already rendered), so the stale continuation may never be exercised. Flush the stale promise / await a side effect before asserting LegacyAPI absent.

[8] suggestion (non-blocking) — src/components/dialog/content/TopUpCreditsDialogContentLegacy.vue:265  (A7)
`handleBuy` panel selection switched to `shouldUseWorkspaceBilling` — this is exactly the regression the PR prevents (personal+consolidated-off must land on legacy panel) but has no test. Add a small test for the true/false branches.

[BODY] question — CurrentUserButton.vue / CurrentUserPopoverWorkspace.vue (not in diff)  (C1 Major-3)
Topbar popover still keys on raw `flags.teamWorkspacesEnabled`, so personal+flag-on+consolidated-off gets the workspace popover while the migrated SubscriptionPanel shows legacy. Intentional split or missed call site?

## EXCLUDED (verified non-issues / too low value)
- Security: all pass, fails safe (A3). checkForCompletedTopup can't throw + idempotent (A2/A10) → C1 telemetry double-fire largely mitigated. remoteConfig non-401/403 error state pre-existing & degrades safe. Storybook mock partial (pre-existing). enum ordering trivial. mutation-in-computed (low conf). useSettingUI access path / duplicate useBillingRouting instances / catch-shadow (nits, some pre-existing patterns). a11y role=alert (container pre-existing, not in diff; low-med) — mention only if desired.
