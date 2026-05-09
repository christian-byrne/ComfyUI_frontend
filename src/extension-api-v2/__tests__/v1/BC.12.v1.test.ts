// DB cross-ref: BC.12 — S4.W3
// blast_radius: 27.94  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.12 v1 — Per-widget serialization transform', () => {
  it.todo('widget.serializeValue(node, index) is called during graphToPrompt and its return value replaces widget.value in the API payload')
  it.todo('widget.serializeValue returning a Promise resolves before the prompt is submitted')
  it.todo('widgets without serializeValue fall back to serializing widget.value directly')
})
