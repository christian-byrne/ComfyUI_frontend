// DB cross-ref: BC.25 — S12.UI1
// blast_radius: 10.98  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.25 v1 — Shell UI registration (commands, sidebars, toasts)', () => {
  it.todo('app.registerExtension({ commands }) registers command objects accessible via app.commands after setup')
  it.todo('app.extensionManager.registerSidebarTab({ id, icon, title, render }) adds a sidebar tab that can be retrieved by id')
  it.todo('app.extensionManager.toast.add({ severity, summary, detail }) dispatches a toast notification without throwing')
  it.todo('a registered command object exposes at minimum { id, function } and is callable via app.commands[id]()')
})
