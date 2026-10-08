## Agent: structural-discipline

### Findings

#### [m1] `shouldUseWorkspaceBilling` is a derived duplicate of `type` in the public surface
- **File:** `src/composables/billing/useBillingRouting.ts:33-35`
- **Severity:** minor
- **Category:** structural-discipline
- **Description:** `BillingType` is a binary enum (`'legacy' | 'workspace'`, types.ts:19). `shouldUseWorkspaceBilling` is defined as `type.value === 'workspace'`, so the composable now exports two isomorphic representations of the exact same bit. Both are consumed across the codebase — the boolean at 4 sites (`TopUpCreditsDialogContentLegacy`, `UsageLogsTable`, `SubscriptionPanel`, `useSubscriptionDialog`) and the enum at 2 (`useBillingContext` re-export, `useSettingUI`). This is exactly the derivable-state / minimize-surface concern in AGENTS.md ("if it's possible to use the value directly, don't add a computed"; "minimize the surface area of each module"). Two names for one state means readers must learn that `type === 'workspace'` and `shouldUseWorkspaceBilling` can never disagree, and a future third `BillingType` variant would silently make the boolean lossy.
- **Suggestion:** Judgment call — either (a) export only `type` and let call sites compare (`type.value === 'workspace'`), since the enum is the richer form and already flows through `useBillingContext`; or (b) if the ergonomic boolean is preferred at UI sites, keep `shouldUseWorkspaceBilling` but drop `type` from the routing composable's return and derive the `'legacy'`/`'workspace'` string where actually needed. Avoid shipping both. Confidence: **Medium** (clear structural redundancy; which direction to collapse is a style preference, hence framed as a question).

#### [N1] Flag space admits an unreachable corner: `consolidatedBillingEnabled` without `teamWorkspacesEnabled`
- **File:** `src/composables/billing/useBillingRouting.ts:18-31`
- **Severity:** nitpick
- **Category:** structural-discipline
- **Description:** Routing is driven by two independent booleans plus workspace type. The combination `teamWorkspacesEnabled=false, consolidatedBillingEnabled=true` is representable but semantically meaningless — consolidated billing has no backend to route to when team workspaces are off. The guard order correctly collapses it to `'legacy'`, so there is no bug; but the two-boolean input space encodes a state that can never validly occur. Raising as a question since the task asked whether the flag/workspace matrix could be modeled to make illegal states unrepresentable.
- **Suggestion:** Not worth changing here: the flags arrive as independent server/remote-config values over the wire, so a client-side union can't prevent the wire from sending the dead corner, and the early-return guard already handles it total-ly. Flagging only for awareness. Confidence: **Low** (correctly handled today; not actionable given independent server-driven flags).

### Notes / positives
- `useBillingRouting`'s `type` computed is a **total** mapping: every combination of (`teamWorkspacesEnabled`, `consolidatedBillingEnabled`, `workspaceType ∈ {personal, team, undefined}`) returns a concrete `BillingType` via guard clauses with no implicit `undefined`/partial return. No lookup-table smell (guard clauses use early returns, not uniform object construction). No dead union variants introduced.
- `useBillingContext`'s `isInitialized`/`isLoading`/`error` triple plus the adapter-identity supersession guard (`activeContext.value !== adapter`) and `UsageLogsTable`'s `latestLoadToken` are genuine async/concurrency state, not derivable fields — correctly excluded from flagging.

### Blind spots
- Reactivity correctness of the shared-composable `type` watch across auth-config resolution is a bug-hunter/regression-risk concern, not assessed here.
- Whether the `subscription` watch change (always writing `isSubscribed:false` on null vs. early-return) is behaviorally correct is out of scope for structural review.
