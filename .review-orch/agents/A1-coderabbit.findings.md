# A1 CodeRabbit Findings

Tool: coderabbit CLI v0.6.3 (`review --plain --type all --base origin/main`)
Auth: christian-byrne (cbyrne@comfy.org), Free OSS plan
Status: DONE
Compare: pr-13359-review → origin/main
Raw result: 3 findings (2 minor, 1 trivial)

Severity mapping: CodeRabbit minor → minor; CodeRabbit trivial → nitpick.

---

## Minor

### 1. Legacy-service errors leak into workspace billing failures
- File: `src/components/dialog/content/setting/UsageLogsTable.vue:191-193`
- Category: Functional Correctness
- Description: When `shouldUseWorkspaceBilling.value` selects `workspaceApi.getBillingEvents`, the null-response error branch can still render `customerEventService.error.value` from an unrelated legacy call. The error shown may come from a legacy service that was not the source of this request.
- Suggestion: Capture the selected route in a local (e.g. `useWorkspaceBilling`) and only use the customer-event fallback for legacy loads:
  ```
  const useWorkspaceBilling = shouldUseWorkspaceBilling.value
  const response = useWorkspaceBilling
    ? await workspaceApi.getBillingEvents(params)
    : await customerEventService.getMyEvents(params)
  ...
  error.value =
    !useWorkspaceBilling && customerEventService.error.value
      ? customerEventService.error.value
      : t('credits.loadEventsError')
  ```

### 2. Test does not flush stale legacy promise before asserting discard
- File: `src/components/dialog/content/setting/UsageLogsTable.test.ts:420-434`
- Category: Functional Correctness
- Description: After `resolveLegacy(...)`, the current `waitFor` can pass immediately because WorkspaceAPI is already rendered, so the test may never actually exercise the stale-continuation path it intends to guard against.
- Suggestion: Await a side effect from the stale continuation (or flush promises) before asserting LegacyAPI never appears, e.g. wait on `mockTelemetry.checkForCompletedTopup` being called, then assert WorkspaceAPI present and LegacyAPI absent.

---

## Nitpick

### 3. Confirm `.review-orch/` tracking files are meant to be committed
- File: `.review-orch/changed-files.txt:1-21`
- Category: Maintainability & Code Quality
- Description: `.review-orch/` (changed-files.txt, context.md, diff.patch, selected-agents.json) looks like output from automated review-orchestration tooling, not application source. `diff.patch` duplicates the entire PR diff and goes stale as new commits land.
- Suggestion: If these only drive the review pipeline, keep them out of the committed tree (.gitignore or store as a CI artifact) rather than merging into main. NOTE: these are the review-orchestrator's own scratch files (untracked in this worktree); not part of the actual PR changeset.
