// DB cross-ref: BC.41 — S17.WV1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.41 v2 — Widget values positional serialization fragility', () => {
  it.todo('WidgetHandle.on("beforeSerialize") allows extensions to mutate the serialized value by name, not by positional index')
  it.todo('WidgetHandle.isSerializeEnabled() and setSerializeEnabled(false) exclude the widget from positional serialization without shifting other widget indices')
  it.todo('WidgetHandle.name is stable across serialization round-trips and does not depend on widget insertion order')
  it.todo('NodeHandle.widget(name) resolves the correct WidgetHandle after a different widget on the same node has been removed')
})
