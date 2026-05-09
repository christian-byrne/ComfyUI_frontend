// Phase A stub — replaced by real ECS world when PR #11939 lands.
// Tests mock this module via vi.mock('@/world/worldInstance').

export interface World {
  getComponent(entityId: unknown, key: unknown): unknown
  setComponent(entityId: unknown, key: unknown, data: unknown): void
  removeComponent(entityId: unknown, key: unknown): void
  entitiesWith(key: unknown): unknown[]
}

export function getWorld(): World {
  throw new Error('[worldInstance] ECS world not yet initialized (Phase A stub)')
}
