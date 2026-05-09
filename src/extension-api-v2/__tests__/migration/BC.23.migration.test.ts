// DB cross-ref: BC.23 — S2.N18
// blast_radius: 14.42  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.23 migration — Node property bag mutations', () => {
  it.todo('v1 nodeType.prototype.onPropertyChanged(name, value) fires with same args as v2 propertyChanged event when node.properties[name] is assigned')
  it.todo('property change observer registered in v1 onPropertyChanged produces the same side-effects as v2 on("propertyChanged") handler')
  it.todo('node.properties mutations survive serialization/deserialization identically in both v1 and v2 paths')
})
