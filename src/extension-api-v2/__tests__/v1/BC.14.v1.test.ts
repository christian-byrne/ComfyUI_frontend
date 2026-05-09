// DB cross-ref: BC.14 — S6.A1
// blast_radius: 46.66  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.14 v1 — Workflow → API serialization interception (graphToPrompt)', () => {
  it.todo('app.registerExtension({ beforeRegisterNodeDef }) can add node-type hooks before graphToPrompt is called')
  it.todo('app.registerExtension({ getCustomWidgets }) custom widget serializeValue is invoked during graphToPrompt')
  it.todo('mutating the output object inside a graphToPrompt promise chain alters the final API payload sent to /prompt')
  it.todo('graphToPrompt rejects cleanly if a widget.serializeValue throws, preventing partial prompt submission')
})
