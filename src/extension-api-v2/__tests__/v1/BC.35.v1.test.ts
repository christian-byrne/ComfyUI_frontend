// DB cross-ref: BC.35 — S6.A5
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.35 v1 — Pre-queue widget validation', () => {
  it.todo('app.registerExtension({ beforeQueuePrompt }) is called before each queue submission and receives the prompt object')
  it.todo('throwing an error inside beforeQueuePrompt cancels the queue submission and surfaces the error message to the user')
  it.todo('returning false from beforeQueuePrompt cancels the submission without throwing an unhandled exception')
})
