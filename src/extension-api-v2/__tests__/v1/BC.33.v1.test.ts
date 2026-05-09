// DB cross-ref: BC.33 — S4.W6
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.33 v1 — Cross-extension DOM widget creation observation', () => {
  it.todo('app.registerExtension({ nodeCreated }) is called after all other extensions have added their widgets to the node, making foreign widgets observable')
  it.todo('an observer extension can read widget.name and widget.type on widgets created by a different extension in the same nodeCreated pass')
  it.todo('wrapping a foreign widget\'s draw method via prototype patching in nodeCreated does not prevent the widget from rendering')
})
