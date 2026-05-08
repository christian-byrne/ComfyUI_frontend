# I-SR — per-node scope registry

Stacked on: PR #2 (Phase A base — docs + surface shim).

## Goal
Implement the per-node instance scope registry that backs the v2 extension API surface.

## In scope (this PR)
- `Map<NodeEntityId, NodeInstanceScope>` keyed by stable node entity id
- create / lookup / dispose lifecycle wired to node add/remove
- copy-on-write semantics per **D12** (clone scope on copy/paste)
- lifecycle ordering per **D10**
- minimal unit tests for create/dispose/copy

## Out of scope
- ECS-native dispatch (Phase B)
- Legacy v1 hook strangler (Phase C)
- Test framework (sibling I-TF PR)
- Widget lazy serialization (sibling I-WS PR)

## Refs
- decisions/D9-strangler-fig-phases.md
- decisions/D10-lifecycle-context-and-ordering.md
- decisions/D12-scope-clone-on-copy.md
- research/touch-points/behavior-categories.yaml
