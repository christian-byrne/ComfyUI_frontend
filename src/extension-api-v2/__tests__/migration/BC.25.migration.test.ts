// DB cross-ref: BC.25 — S12.UI1
// blast_radius: 10.98  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.25 migration — Shell UI registration (commands, sidebars, toasts)', () => {
  it.todo('v1 app.extensionManager.commands.addCommand({id, label, callback}) registers a command visible in the command palette identically to v2 registerCommand()')
  it.todo('v1 app.extensionManager.sidebar.addTab() produces a sidebar tab rendered at the same position as a v2 registerSidebarTab() call')
  it.todo('v1 app.extensionManager.toast.add({severity, summary, detail}) produces the same toast notification as v2 useToastStore().add()')
})
