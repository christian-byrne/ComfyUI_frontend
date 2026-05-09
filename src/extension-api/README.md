# Extension API — Public Source of Truth

> **Status**: scaffolded. Implementation pending PKG2 — see
> `../../../plans/P2-extension-api-package.md` and
> `../../../plans/prompts/PKG2-author-declaration.md` in the workspace
> root.

This folder is the single source of truth for the public ComfyUI extension
API. Every file here is part of the published `@comfyorg/extension-api`
npm package. Do not re-export from `/src` — this barrel is the **published
package entry point**, which is the explicit exception to the project's
"no barrel files in /src" rule (root AGENTS.md rule #19).

## Intended structure (post-PKG2)

```
extension-api/
├── index.ts          ← barrel — package entry point
├── node.ts           ← NodeHandle + NodeEvents + payload types
├── widget.ts         ← WidgetHandle + WidgetEvents + payload types
├── events.ts         ← shared Handler<E>, cross-cutting event types
├── lifecycle.ts      ← Setup ctx, defineExtension, lifecycle hooks
├── shell.ts          ← sidebar, bottom panel, command, toast (moved
│                       from ../types/extensionTypes.ts)
├── identifiers.ts    ← NodeLocatorId etc. (re-exports)
└── README.md         ← this file
```

## What about v1?

v1 (`ComfyExtension` interface in `../types/comfy.ts`, `app.registerExtension(...)`
runtime entry point in `../scripts/app.ts`) **stays in its current locations**.
Custom extensions in the wild consume the runtime entry point, not the type
file — moving the type file would churn ~30 internal imports for zero runtime
benefit. The v1↔v2 distinction is at the entry point (D6 Part 1), not the folder.

## Authoring rules

1. **Hand-authored**, not generated. This is a public API; we own the
   shape.
2. **No `any`, no `as any`, no `@ts-expect-error`.** If you need an
   escape hatch, the type is wrong.
3. Every public type has a TSDoc block with at minimum:
   - 1-line summary
   - `@stability` tag (`stable` | `experimental` | `deprecated`)
   - `@example` block
4. Naming follows D6 Part 3:
   - Read-only invariants (set at construction): accessor (`get name()`)
   - Read-only state (changes over time): method (`getValue()`)
   - Mutating actions: method (`setValue(v)`)
   - Boolean predicates: method (`isHidden()`)
5. Events follow D5: typed payloads, no `Function`, split-channel events
   (`valueChange`/`optionChange`/`propertyChange`).
6. No internal types (`World`, `Component<T>`, branded `EntityId`)
   leak through this barrel.

## Cross-references

- `decisions/D5-events-and-payload-typing.md`
- `decisions/D6-parallel-paths-migration.md`
- `decisions/D7-widget-shape-and-persistence.md` (gating blocker for
  `widget.ts`)
- `decisions/D8-world-vue-reactive-adapter.md`
- `plans/P2-extension-api-package.md`
- `plans/P1-comfy-extension-v2-api.md`
