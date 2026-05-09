// Category: BC.13 — Per-node serialization interception
// DB cross-ref: S2.N6, S2.N15
// Exemplar: https://github.com/Azornes/Comfyui-LayerForge/blob/main/js/CanvasView.js#L1438
// blast_radius: 6.36 — compat-floor: blast_radius ≥ 2.0 — MUST pass before v2 ships
// v1 contract: node.prototype.serialize = function() { const r = origSerialize.call(this); r.myData = ...; return r }
//              node.onSerialize = function(data) { data.myData = ... }
// Notes: widgets_values is positional. Three index-drift sources: control_after_generate slot occupancy,
//        extension-injected widgets, V3 IO.MultiType topology-dependent widget count. NaN→null pipeline
//        produces silent corruption. Test (a) positional v1 compat, (b) named-map v2 round-trip parity,
//        (c) null-in-numeric-widget logs warning + substitutes default.

import { describe, it } from 'vitest'

describe('BC.13 v1 contract — per-node serialization interception', () => {
  describe('S2.N6 — prototype.serialize patching', () => {
    it.todo(
      'patching node.constructor.prototype.serialize and calling origSerialize.call(this) produces the base serialization object which can be extended with custom fields'
    )
    it.todo(
      'custom fields added to the object returned by the patched serialize are present in the workflow JSON written to disk'
    )
    it.todo(
      'multiple extensions each patching prototype.serialize via origSerialize chaining all contribute their custom fields to the final serialized object'
    )
    it.todo(
      'positional widgets_values in the patched serialize output drifts when a serialize===false widget occupies a slot before the target widget'
    )
  })

  describe('S2.N15 — node.onSerialize callback', () => {
    it.todo(
      'assigning node.onSerialize = fn causes fn to be called with the serialization data object after the base serialize completes'
    )
    it.todo(
      'onSerialize may mutate data.myData in place; the mutation is reflected in the workflow JSON'
    )
    it.todo(
      'NaN values written to widgets_values inside onSerialize are silently coerced to null by JSON.stringify, producing silent corruption'
    )
    it.todo(
      'onSerialize fires once per serialization pass; calling graphToPrompt() twice calls onSerialize twice'
    )
  })

  describe('NaN→null silent corruption', () => {
    it.todo(
      'a numeric widget whose serializeValue returns NaN causes a null entry in widgets_values after JSON round-trip'
    )
    it.todo(
      'the null entry in widgets_values is loaded back as null on graph restore, not as 0 or the widget default'
    )
  })
})
