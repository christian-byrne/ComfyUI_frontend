import { validateLamportCounter } from '@comfyorg/comfy-multi-player'
import type {
  LamportClockStore,
  LamportProducerClock
} from '@comfyorg/comfy-multi-player'

type ClockIdentity = Omit<LamportProducerClock, 'counter'>

function storageKey(identity: ClockIdentity): string {
  return `comfy.agent.lamport:${JSON.stringify(identity)}`
}

/**
 * Durable browser storage for one producer clock. Transactions are serialized
 * within a live sender; a reload creates a new store and reads the same key.
 */
export function createLamportClockStore(storage: Storage): LamportClockStore {
  let tail: Promise<void> = Promise.resolve()

  return {
    transaction(identity, update) {
      const next = tail.then(async () => {
        const key = storageKey(identity)
        const raw = storage.getItem(key)
        const stored =
          raw === null ? undefined : validateLamportCounter(Number(raw), true)
        const result = await update(stored)
        storage.setItem(
          key,
          String(validateLamportCounter(result.counter, true))
        )
        return result.value
      })
      tail = next.then(
        () => undefined,
        () => undefined
      )
      return next
    }
  }
}
