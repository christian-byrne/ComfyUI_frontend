// DB cross-ref: BC.22 — S2.N5,S1.H3,S1.H4
// blast_radius: 19.53  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.22 migration — Context menu contributions (node and canvas)', () => {
  it.todo('v1 nodeType.prototype.getExtraMenuOptions returns items that appear in the right-click menu identically to v2 nodeContextMenu contributions')
  it.todo('v1 ComfyExtension.getCanvasMenuItems array is rendered in the canvas context menu in the same position as v2 canvasContextMenu hook items')
  it.todo('v1 ComfyExtension.getNodeMenuItems contributions appear in node menus identically to v2 nodeContextMenu registered items')
  it.todo('menu item click handler receives the same node/canvas reference in v1 getExtraMenuOptions as in v2 nodeContextMenu event context')
})
