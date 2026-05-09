// DB cross-ref: BC.12 — S4.W3
// blast_radius: 27.94  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.12 migration — Per-widget serialization transform', () => {
  it.todo('v1 widget.serializeValue() return value appears at the same widgets_values position as v2 on("beforeSerialize") event.setSerializedValue() output')
  it.todo('v1 widget.serializeValue returning a transformed string produces the same serialized workflow JSON field as the v2 serializeValue hook')
  it.todo('v2 beforeSerialize event is called exactly once per widget per graphToPrompt, matching v1 serializeValue invocation frequency')
})
