// Category: BC.41 — Widget values positional serialization fragility
// DB cross-ref: S17.WV1
// Exemplar: https://github.com/Comfy-Org/ComfyUI_frontend/blob/main/src/utils/nodeDefOrderingUtil.ts
// blast_radius: 3.45
// compat-floor: blast_radius ≥ 2.0
// migration: node.widgets_values positional array → widgets_values_named opt-in + migrateWidgetValues callback

import { describe, it } from 'vitest'

describe('BC.41 migration — widget values positional serialization fragility', () => {
  describe('positional to named migration', () => {
    it.todo(
      'extension opts in to named dict by setting widgets_values_named: true in node definition'
    )
    it.todo(
      'existing workflow JSONs with positional arrays are handled by the migrateWidgetValues callback during load'
    )
    it.todo(
      'workflows saved after opt-in use named dict format and are not loadable by v1 ComfyUI without migration'
    )
  })

  describe('migrateWidgetValues implementation', () => {
    it.todo(
      'migrateWidgetValues must convert the positional array to a { widgetName: value } dict using historical input_order'
    )
    it.todo(
      'null guard (PR #11884) prevents migrateWidgetValues from being called with undefined values'
    )
  })

  describe('blocked long-term fix', () => {
    it.todo(
      'full named dict serialization as the default requires a breaking workflow JSON schema change with versioning'
    )
    it.todo(
      'migration to named dict as default is blocked on workflow-schema-migration work, out of v2 surface scope'
    )
  })
})
