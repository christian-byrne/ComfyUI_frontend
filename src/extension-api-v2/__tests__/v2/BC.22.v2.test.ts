// DB cross-ref: BC.22 — S2.N5,S1.H3,S1.H4
// blast_radius: 19.53  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.22 v2 — Context menu contributions (node and canvas)', () => {
  it.todo('defineExtension shell.commandManager.registerCommand adds command visible in node context menu')
  it.todo('defineExtension setup callback can contribute canvas-level context menu entries via CommandManager')
  it.todo('context menu command registered via v2 receives NodeHandle as argument when triggered on a node')
  it.todo('multiple extensions contributing context menu entries do not collide by command name')
})
