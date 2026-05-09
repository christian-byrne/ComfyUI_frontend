// DB cross-ref: BC.19 — S6.A4
// blast_radius: 12.65  compat-floor: yes
import { describe, it } from 'vitest'

describe('BC.19 v2 — Workflow execution trigger', () => {
  it.todo('defineExtension setup exposes a queuePrompt() method that enqueues the current graph')
  it.todo('queuePrompt() returns a Promise that resolves with the prompt id assigned by the server')
  it.todo('queuePrompt() serializes the graph via graphToPrompt hooks before sending')
})
