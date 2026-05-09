// DB cross-ref: BC.02 — S2.N4
// blast_radius: 29.35  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.02 migration — Node lifecycle: teardown', () => {
  it.todo('v1 nodeType.prototype.onRemoved fires at the same graph-removal point as v2 defineNodeExtension nodeRemoved callback')
  it.todo('cleanup registered in v1 onRemoved (removing DOM widgets, clearing intervals) is equivalent to cleanup in v2 nodeRemoved')
  it.todo('v2 nodeRemoved callback receives the same node reference as v1 onRemoved this-context')
})
