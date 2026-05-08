/**
 * Extension V2 Service
 *
 * Manages extension lifecycle: scope creation, handle construction,
 * reactive dispatch. The extension system watches the ECS World for
 * entity creation/removal and auto-mounts/unmounts extension scopes.
 *
 * Pattern mirrors Vue's setupStatefulComponent (component.ts:829-927):
 * - scope.run() activates the EffectScope (like setCurrentInstance)
 * - pauseTracking() prevents accidental deps during setup
 * - All watches/effects created inside scope.run() are captured
 * - scope.stop() on entity removal cleans up everything
 *
 * See decisions/D3.5-reactive-dispatch-and-scope-alignment.md
 */

import { onScopeDispose, watch } from 'vue'

import { scopeRegistry } from '@/services/ext-v2/scopeRegistry'
import { runSetupOnce } from '@/services/ext-v2/lifecycle'

// These modules don't exist yet — they will be created as part of ADR 0008.
import { useWorld } from '@/ecs/world'
import { dispatch } from '@/ecs/commands'
import {
    Position,
    Dimensions,
    NodeVisual,
    NodeType,
    Execution,
    WidgetValue,
    WidgetIdentity,
    WidgetContainer,
    Connectivity,
    SlotIdentity,
    LoadedFromWorkflow
} from '@/ecs/components'
import type {
    NodeEntityId,
    WidgetEntityId,
    SlotEntityId
} from '@/ecs/entityIds'

import type {
    NodeExtensionOptions,
    NodeHandle,
    WidgetExtensionOptions,
    WidgetHandle,
    WidgetOptions,
    SlotInfo,
    Point,
    Size
} from '@/types/extensionV2'

// ─── Scope Registry ──────────────────────────────────────────────────
// One NodeInstanceScope per node entity (NOT per extension). Multiple
// extensions register hooks/watchers inside the same scope; disposeScope
// stops them all in one EffectScope.stop() cascade.
//
// Implementation lives in `./ext-v2/scopeRegistry` (I-SR.2).
// Lifecycle: `./ext-v2/lifecycle` provides `runSetupOnce` with Vue
// EffectScope.run() semantics and ordered hook registration (D10b).
//
// Copy/paste path (D12): `scopeRegistry.cloneScope(srcId, dstId)` is
// available for the clipboard / duplicate handler. Per the D12 stance,
// the clone deep-clones extensionState but does NOT re-run setup —
// integration with the actual copy/paste call site is tracked outside
// this PR.

// ─── WidgetHandle ────────────────────────────────────────────────────

function createWidgetHandle(widgetId: WidgetEntityId): WidgetHandle {
    const world = useWorld() // should this be lazy? like let _world = null;get world() { this._world ??= useWorld(); return this._world }

    return {
        entityId: widgetId,

        // is "name" a constatnt variable name throughout our system?
        get name() {
            return world.getComponent(widgetId, WidgetIdentity).name
        },

        // Sort of want to just name this as type, might be bad though
        get widgetType() {
            return world.getComponent(widgetId, WidgetIdentity).type
        },

        getValue<T = unknown>(): T {
            return world.getComponent(widgetId, WidgetValue).value as T
        },
        setValue(value: unknown) {
            dispatch({ type: 'SetWidgetValue', widgetId, value })
        },

        // why is hidden special and not just part of Options / props
        // Consider: putting props into serialized form, persisting props
        isHidden() {
            return (
                world.getComponent(widgetId, WidgetValue).options?.hidden ?? false
            )
        },
        setHidden(hidden: boolean) {
            dispatch({
                type: 'SetWidgetOption',
                widgetId,
                key: 'hidden',
                value: hidden
            })
        },

        getOptions(): WidgetOptions {
            return world.getComponent(widgetId, WidgetValue).options ?? {}
        },
        setOption(key: string, value: unknown) {
            dispatch({ type: 'SetWidgetOption', widgetId, key, value })
        },

        // what is special about label that it can't just be an option/prop?
        setLabel(label: string) {
            dispatch({ type: 'SetWidgetLabel', widgetId, label })
        },

        on(event: string, fn: Function) {
            // "change" feels like it could be watching options or values, when it in fact only watches value. but then how do ppl watch optoins and props?
            if (event === 'change') {
                watch(
                    () => world.getComponent(widgetId, WidgetValue).value, // this return is not nullish ever?
                    (newVal, oldVal) => fn(newVal, oldVal) // best practices for event dispatcher types in libraries
                )
            }
            if (event === 'removed') {
                onScopeDispose(() => fn())
            }
        },

        // this seems like it should be `on("serialize")` to a certain extent. however, this is a callback/hook rather than watcher.
        // maybe opportunity for onBeforeSerialize -- and then we don't actually operate on callbacks at all or pass the value before
        // a serialization pipeline -- instead, they just access and mutate the model value (widget val) in the lexical scope of their
        // hook on the event, and don't necessarily need to have the value passed to them etc.
        setSerializeValue(fn) {
            dispatch({ type: 'SetWidgetSerializer', widgetId, serializer: fn })
        }
    }
}

// ─── NodeHandle ──────────────────────────────────────────────────────

function createNodeHandle(nodeId: NodeEntityId): NodeHandle {
    const world = useWorld()

    return {
        entityId: nodeId,
        get type() {
            return world.getComponent(nodeId, NodeType).type
        },
        get comfyClass() {
            return world.getComponent(nodeId, NodeType).comfyClass
        },

        // Reads — direct World queries
        // I believe these should all just be like `get pos(), get size(), get title(), etc.
        getPosition(): Point {
            return world.getComponent(nodeId, Position).pos
        },
        getSize(): Size {
            return world.getComponent(nodeId, Dimensions).size
        },
        getTitle() {
            return world.getComponent(nodeId, NodeVisual).title
        },
        getMode() {
            return world.getComponent(nodeId, Execution).mode
        },

        // should be the get properties() layer, importance nuance here as this is typically the special properties set that is always
        // and used for a ton of stuff by extensions currently for when they need to persist something across tear down cycles.
        getProperty<T = unknown>(key: string): T | undefined {
            return world.getComponent(nodeId, NodeType).properties?.[key] as T
        },
        getProperties() {
            return { ...world.getComponent(nodeId, NodeType).properties }
        },

        // should just be get selected() right?
        isSelected() {
            return world.getComponent(nodeId, NodeVisual).selected ?? false
        },

        // Writes — command dispatches
        // similar to above, should be like set pos(), set size(), set title(), etc.
        setPosition(pos: Point) {
            dispatch({ type: 'MoveNode', nodeId, pos })
        },
        setSize(size: Size) {
            dispatch({ type: 'ResizeNode', nodeId, size })
        },
        setTitle(title: string) {
            dispatch({ type: 'SetNodeVisual', nodeId, patch: { title } })
        },
        setMode(mode) {
            dispatch({ type: 'SetNodeMode', nodeId, mode })
        },
        setProperty(key: string, value: unknown) {
            dispatch({ type: 'SetNodeProperty', nodeId, key, value })
        },

        // Widgets
        // need a figler tree for widget_values
        // need a coverage report overview of which class/instance properties and methods are strangler fig'ed, which are directly re-implemented
        // (and extent to which they are 1:1 with the old shape/behaviors), and which are breaking / not supoprted anymore.
        widget(name: string) {
            const container = world.getComponent(nodeId, WidgetContainer)
            const widgetId = container.widgetIds.find((id) => {
                return world.getComponent(id, WidgetIdentity).name === name
            })
            return widgetId ? createWidgetHandle(widgetId) : undefined
        },
        widgets() {
            const container = world.getComponent(nodeId, WidgetContainer)
            return container.widgetIds.map(createWidgetHandle)
        },
        addWidget(type, name, defaultValue, options) {
            const widgetId = dispatch({
                type: 'CreateWidget',
                parentNodeId: nodeId,
                widgetType: type,
                name,
                defaultValue,
                options
            })
            return createWidgetHandle(widgetId)
        },

        // Slots
        inputs() {
            const conn = world.getComponent(nodeId, Connectivity)
            return conn.inputSlotIds.map((slotId) => {
                const slot = world.getComponent(slotId, SlotIdentity)
                return {
                    entityId: slotId,
                    name: slot.name,
                    type: slot.type,
                    direction: 'input' as const,
                    nodeEntityId: nodeId
                } satisfies SlotInfo
            })
        },
        outputs() {
            const conn = world.getComponent(nodeId, Connectivity)
            return conn.outputSlotIds.map((slotId) => {
                const slot = world.getComponent(slotId, SlotIdentity)
                return {
                    entityId: slotId,
                    name: slot.name,
                    type: slot.type,
                    direction: 'output' as const,
                    nodeEntityId: nodeId
                } satisfies SlotInfo
            })
        },

        // Events — backed by World component watches
        on(event: string, fn: Function) {
            if (event === 'positionChanged') {
                watch(
                    () => world.getComponent(nodeId, Position).pos,
                    (pos) => fn(pos)
                )
            } else if (event === 'sizeChanged') {
                watch(
                    () => world.getComponent(nodeId, Dimensions).size,
                    (s) => fn(s)
                )
            } else if (event === 'modeChanged') {
                watch(
                    () => world.getComponent(nodeId, Execution).mode,
                    (m) => fn(m)
                )
            } else if (event === 'executed') {
                world.onSystemEvent(nodeId, 'executed', fn)
            } else if (event === 'connected') {
                world.onSystemEvent(nodeId, 'connected', fn)
            } else if (event === 'disconnected') {
                world.onSystemEvent(nodeId, 'disconnected', fn)
            } else if (event === 'configured') {
                world.onSystemEvent(nodeId, 'configured', fn)
            } else if (event === 'removed') {
                onScopeDispose(() => fn())
            }
        }
    }
}

// ─── Extension Registry ──────────────────────────────────────────────

const nodeExtensions: NodeExtensionOptions[] = []
const widgetExtensions: WidgetExtensionOptions[] = []

export function defineNodeExtension(options: NodeExtensionOptions): void {
    nodeExtensions.push(options)
}

export function defineWidgetExtension(options: WidgetExtensionOptions): void {
    widgetExtensions.push(options)
}

// ─── Reactive Mount System ───────────────────────────────────────────
// Watches the World for entity creation/removal. When a NodeType
// component appears, extensions are mounted for that entity. When it
// disappears, all extension scopes for that entity are stopped.
//
// This replaces the imperative dispatchNodeCreated/dispatchLoadedGraphNode
// pattern. The World is the single source of truth — if an entity
// exists, its extensions are mounted.

/**
 * Mount extensions for a newly detected node entity.
 *
 * Per I-SR.2:
 * 1. getOrCreateScope returns the (per-node) NodeInstanceScope.
 * 2. runSetupOnce wraps EffectScope.run() with Vue-style semantics
 *    and idempotency per (scope, extensionId).
 * 3. Hook ordering across extensions is preserved by passing each
 *    extension's index in `nodeExtensions` as `registrationOrder`
 *    (D10b: registration order, lex tie-break on extension name).
 */
function mountExtensionsForNode(nodeId: NodeEntityId): void {
    const world = useWorld()
    const comfyClass = world.getComponent(nodeId, NodeType).comfyClass
    const isLoaded = world.hasComponent(nodeId, LoadedFromWorkflow)

    const scope = scopeRegistry.getOrCreateScope(nodeId)

    for (let i = 0; i < nodeExtensions.length; i++) {
        const ext = nodeExtensions[i]
        if (ext.nodeTypes && !ext.nodeTypes.includes(comfyClass)) continue

        const hook = isLoaded ? ext.loadedGraphNode : ext.nodeCreated
        if (!hook) continue

        runSetupOnce(
            scope,
            ext.name,
            () => hook(createNodeHandle(nodeId)),
            { registrationOrder: i }
        )
    }
}

/**
 * Unmount the per-node scope for a removed node entity.
 * disposeScope -> EffectScope.stop() cascades cleanup of every watch,
 * computed, and onScopeDispose callback registered during setup of any
 * extension on this node.
 *
 * Per the I-SR.2 brief, this is invoked ONLY on graph deletion. DOM
 * moves and subgraph promotions preserve the entity id and therefore
 * preserve the scope.
 */
function unmountExtensionsForNode(nodeId: NodeEntityId): void {
    scopeRegistry.disposeScope(nodeId)
}

/**
 * Start the reactive extension mount system.
 *
 * Called once during app initialization. Watches the World's entity list
 * and auto-mounts/unmounts extensions as entities appear/disappear.
 *
 * This means no code path (add node, paste, load workflow, undo, CRDT
 * sync) needs to manually call a dispatch function — the World is the
 * single source of truth.
 */
export function startExtensionSystem(): void {
    const world = useWorld()

    watch(
        () => world.queryAll(NodeType),
        (currentIds, previousIds) => {
            const prev = new Set(previousIds ?? [])
            const curr = new Set(currentIds)

            for (const nodeId of currentIds) {
                if (!prev.has(nodeId)) {
                    mountExtensionsForNode(nodeId)
                }
            }

            for (const nodeId of previousIds ?? []) {
                if (!curr.has(nodeId)) {
                    unmountExtensionsForNode(nodeId)
                }
            }
        },
        { flush: 'post' }
    )
}
