// DB cross-ref: BC.38 — S17.AM1
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.38 v1 — Canvas mode observation', () => {
  it.todo('app.canvas.read_only is a boolean that v1 extensions can read to detect whether the canvas is in read-only mode')
  it.todo('app.canvas.state.isInteractingWithWidget reflects true while a widget is being manipulated and false otherwise')
  it.todo('an extension listening to app.canvas on("mode_change") receives the new mode value when app.changeMode() is called')
})
