/**
 * Review proofs — NOT for merge. Each test asserts the CURRENT behaviour so a
 * reviewer can see the claim is real rather than theoretical.
 */
import { describe, expect, it, vi } from 'vitest'

import type { SessionClient, SessionSnapshot } from '../session.js'
import type { AccountCredential } from '../sessionContracts.js'
import type { BillingTransport } from './billingContracts.js'
import { createCapabilitiesReader } from './capabilities.js'
import { createCreditsReader } from './credits.js'
import { createSessionBillingTransport } from './transport.js'

function credential(o: Partial<AccountCredential> = {}): AccountCredential {
  return {
    token: 'workspace-jwt',
    expiresAt: Date.now() + 3_600_000,
    uid: 'uid-1',
    workspace: { id: 'ws-1', name: 'Personal', type: 'personal' },
    role: 'owner',
    permissions: ['workspace:read'],
    ...o
  }
}

function authenticated(session: AccountCredential): SessionSnapshot {
  return {
    phase: 'authenticated',
    user: { uid: session.uid, getIdToken: async () => 'id-token' },
    session
  }
}

function fakeSession(initial = authenticated(credential())) {
  let snapshot = initial
  const listeners = new Set<(next: SessionSnapshot) => void>()
  const fake: Pick<SessionClient, 'getSnapshot' | 'subscribe'> = {
    getSnapshot: () => snapshot,
    subscribe: (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    }
  }
  return {
    session: fake as SessionClient,
    moveTo(next: SessionSnapshot) {
      snapshot = next
      for (const l of [...listeners]) l(snapshot)
    }
  }
}

const BALANCE = { amount_micros: 1, currency: 'USD' }

describe('PROOF 1: a throwing host transport escapes the coded-result contract', () => {
  it('rejects instead of returning a BillingFailure when no signal is passed', async () => {
    const { session } = fakeSession()
    // BillingTransport is a public port exported from @comfyorg/account/billing.
    // A host implementation that throws is not prevented by the type.
    const transport = (() => {
      throw new TypeError('host transport blew up')
    }) as unknown as BillingTransport
    const reader = createCreditsReader({ transport, session })

    await expect(reader.read()).rejects.toThrow('host transport blew up')
  })

  it('but a caller that happens to pass a signal gets the coded failure', async () => {
    const { session } = fakeSession()
    const transport = (() => {
      throw new TypeError('host transport blew up')
    }) as unknown as BillingTransport
    const reader = createCreditsReader({ transport, session })

    // Same defect, opposite outcome: releaseOnAbort's rejection handler only
    // runs on the signal path, so two callers of one API disagree on whether
    // billing throws.
    await expect(
      reader.read({ signal: new AbortController().signal })
    ).resolves.toEqual({ status: 'error', code: 'REQUEST_FAILED' })
  })
})

describe('PROOF 2: an older read publishes over a newer one for the same scope', () => {
  it('republishes stale capabilities after a scope round-trip', async () => {
    const host = fakeSession()
    const gates: Array<() => void> = []
    let call = 0
    const transport: BillingTransport = vi.fn(async () => {
      const n = ++call
      await new Promise<void>((r) => gates.push(r))
      return {
        status: 'ok' as const,
        value: {
          httpStatus: 200,
          body: {
            capabilities: {
              can_cancel: false,
              can_change_seats: false,
              can_downgrade_to_personal: false,
              can_invite_members: false,
              can_reactivate: false,
              can_subscribe_self_serve: false,
              can_top_up: true
            },
            expires_at: new Date(Date.now() + 600_000).toISOString(),
            resolved_for: { user_id: 'uid-1', workspace_id: 'ws-1' },
            // read #1 is the OLD one; read #3 is the NEW one.
            revision: n === 1 ? 10 : 99,
            rollout_defaults_applied: {
              can_downgrade_to_personal: false,
              can_subscribe_self_serve: false,
              can_top_up: true
            }
          },
          header: () => null
        }
      }
    })
    const reader = createCapabilitiesReader({ transport, session: host.session })

    // A: read for ws-1, left in flight.
    const a = reader.read()
    await vi.waitFor(() => expect(gates).toHaveLength(1))

    // Host moves to ws-2 and back to ws-1, starting a fresh read for ws-1.
    const teamCred = credential({
      workspace: { id: 'ws-2', name: 'Team', type: 'team' }
    })
    host.moveTo(authenticated(teamCred))
    const b = reader.read()
    await vi.waitFor(() => expect(gates).toHaveLength(2))
    host.moveTo(authenticated(credential()))
    const c = reader.read()
    await vi.waitFor(() => expect(gates).toHaveLength(3))

    // C (newest) settles first, then A (oldest) settles and overwrites it.
    gates[2]()
    await c
    expect(reader.getSnapshot()?.revision).toBe(99)

    gates[1]()
    gates[0]()
    await Promise.allSettled([a, b])

    // The published snapshot is now the OLDER read's answer.
    expect(reader.getSnapshot()?.revision).toBe(10)
  })
})

describe('PROOF 3: the request budget is per attempt, and mints are unbounded', () => {
  it('takes far longer than the caller-supplied timeoutMs', async () => {
    vi.useFakeTimers()
    try {
      const cred = credential()
      // A session whose mint never settles on its own. The real client bounds
      // this with its own 15s default, but the billing transport never passes
      // request.timeoutMs down, so the caller's budget does not apply to it.
      const slowMint = () =>
        new Promise<{ status: 'ok'; session: AccountCredential }>((resolve) =>
          setTimeout(() => resolve({ status: 'ok', session: cred }), 15_000)
        )
      const session = {
        ensureFresh: vi.fn(slowMint),
        remint: vi.fn(slowMint),
        getSnapshot: () => authenticated(cred)
      } as unknown as SessionClient

      let fetches = 0
      const transport = createSessionBillingTransport({
        session,
        resolveUrl: (r) => `https://cloud.test/api${r}`,
        fetchImpl: vi.fn<typeof fetch>(async (_i, init) => {
          fetches++
          // Stall until the transport's own per-attempt timer aborts us.
          await new Promise<void>((_res, rej) =>
            init?.signal?.addEventListener('abort', () =>
              rej(new DOMException('Aborted', 'AbortError'))
            )
          )
          return new Response('{}')
        })
      })

      const pending = transport({
        method: 'GET',
        route: '/billing/capabilities',
        timeoutMs: 10_000 // the "production 10s budget" capabilities.ts states
      })
      const settled = vi.fn()
      void pending.then(settled)

      // The stated budget elapses...
      await vi.advanceTimersByTimeAsync(10_000)
      expect(settled).not.toHaveBeenCalled()
      expect(fetches).toBe(0) // still waiting on the first mint

      // mint(15s) + attempt(10s) + remint(15s)? No 401 here, so: mint + attempt.
      await vi.advanceTimersByTimeAsync(15_000) // first mint lands
      expect(fetches).toBe(1)
      await vi.advanceTimersByTimeAsync(10_000) // attempt times out
      await expect(pending).resolves.toEqual({
        status: 'error',
        code: 'REQUEST_FAILED'
      })

      // 25s elapsed against a 10s stated budget, with no 401 retry involved.
    } finally {
      vi.useRealTimers()
    }
  })
})

describe('PROOF 4: dispose leaves another account reachable', () => {
  it('keeps serving the signed-out user’s balance after dispose', async () => {
    const host = fakeSession()
    const transport: BillingTransport = vi.fn(async () => ({
      status: 'ok' as const,
      value: { httpStatus: 200, body: BALANCE, header: () => null }
    }))
    const reader = createCreditsReader({ transport, session: host.session })

    await reader.read()
    expect(reader.getSnapshot()?.scope.userId).toBe('uid-1')

    reader.dispose()
    host.moveTo({ phase: 'signed-out', user: null, session: undefined })

    // uid-1 signed out, yet their balance is still handed out.
    expect(reader.getSnapshot()?.balance.amount_micros).toBe(1)
    expect(reader.getSnapshot()?.scope.userId).toBe('uid-1')
  })
})
