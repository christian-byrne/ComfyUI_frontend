// DB cross-ref: BC.31 — S16.DOM1,S16.DOM2,S16.DOM3,S16.DOM4
// blast_radius: 0.0  compat-floor: no
import { describe, it } from 'vitest'

describe('BC.31 v1 — DOM injection and style management', () => {
  it.todo('a <style> tag appended to document.head by an extension is present in the DOM after app setup completes')
  it.todo('a DOM widget created by assigning node.widget = { type: "dom", element: HTMLElement } renders its element in the canvas overlay')
  it.todo('document.getElementById on an id injected by an extension inside nodeCreated returns a non-null element')
})
