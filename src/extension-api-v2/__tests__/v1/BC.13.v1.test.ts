// DB cross-ref: BC.13 — S2.N6,S2.N15
// blast_radius: 47.07  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.13 v1 — Per-node serialization interception', () => {
  it.todo('nodeType.prototype.onSerialize is called with the serialized node object and can mutate it before save')
  it.todo('extra keys written onto the serialized object inside onSerialize are persisted in the workflow JSON')
  it.todo('nodeType.prototype.getExtraInfo returns an object that is merged into the serialized node under "properties"')
  it.todo('round-tripping through serialize → loadJSON → onConfigure restores values written in onSerialize')
})
