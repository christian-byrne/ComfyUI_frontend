# I-TF — test framework + behavior-category fixtures

Stacked on: PR #2 (Phase A base — docs + surface shim).

## Goal
Stand up the v2 extension API test framework mapping the 30 behavior categories
(`research/touch-points/behavior-categories.yaml`) onto runnable stubs and fixtures.

## In scope (this PR)
- I-TF.2 — test stub generator (one stub per category; all 56→59 patterns covered exactly once)
- I-TF.3 — harness scaffold (vitest setup, fake World/Node fixtures)
- I-TF.6 — `loadEvidenceSnippet()` surfacing R8 clone-and-grep excerpts in failures
- smoke tests that pass against the current surface-only shim

## Out of scope
- ECS-native implementations (Phase B)
- Scope registry semantics (sibling I-SR PR)
- Serialization edge cases (sibling I-WS PR)

## Refs
- I-TF.1 done: behavior-categories.yaml + scripts/build-behavior-categories.py
- R8 clone-and-grep evidence (887 rows, 52/56 patterns)
- decisions/D9-strangler-fig-phases.md
