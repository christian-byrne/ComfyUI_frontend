// DB cross-ref: BC.03 — S1.H1,S2.N7
// blast_radius: 15.42  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.03 v1 — Node lifecycle: hydration from saved workflows', () => {
  it.todo('nodeType.prototype.onConfigure is called with saved node data when a workflow is loaded')
  it.todo('app.registerExtension({ loadedGraphNode }) callback fires for each node during workflow load')
  it.todo('widget values restored via onConfigure match the serialized workflow values exactly')
  it.todo('extensions can augment node state inside onConfigure without overwriting restored widget values')
})
