import { expect, it, vi } from 'vitest'
import type { SessionClient } from '../session.js'
import type { AccountCredential } from '../sessionContracts.js'
import { createSessionBillingTransport } from './transport.js'

const cred: AccountCredential = {
  token: 'jwt', expiresAt: Date.now() + 3_600_000, uid: 'uid-1',
  workspace: { id: 'ws-1', name: 'Personal', type: 'personal' },
  role: 'owner', permissions: ['workspace:read']
}

it('REGRESSION: a mint aborted by the new shared deadline throws instead of returning a coded failure', async () => {
  vi.useFakeTimers()
  try {
    // A realistic mint: it honours the signal the transport now hands it, and
    // rejects with AbortError -- exactly what exchange.ts does on abort.
    const mint = (_u: unknown, o: any) =>
      new Promise((resolve, reject) => {
        const t = setTimeout(() => resolve({ status: 'ok', session: cred }), 15_000)
        o?.signal?.addEventListener('abort', () => {
          clearTimeout(t)
          reject(new DOMException('Aborted', 'AbortError'))
        })
      })
    const session = {
      ensureFresh: vi.fn(mint), remint: vi.fn(mint),
      getSnapshot: () => ({ phase: 'authenticated', user: { uid: 'uid-1', getIdToken: async () => 'i' }, session: cred })
    } as unknown as SessionClient

    const transport = createSessionBillingTransport({
      session, resolveUrl: (r) => `https://cloud.test/api${r}`,
      fetchImpl: vi.fn<typeof fetch>(async () => new Response('{}'))
    })

    let rejectedWith: unknown = null
    let resolvedWith: unknown = null
    const pending = transport({ method: 'GET', route: '/billing/capabilities', timeoutMs: 10_000 })
      .then((r) => { resolvedWith = r }, (e) => { rejectedWith = e })

    await vi.advanceTimersByTimeAsync(10_000)
    await pending

    // BillingTransport is typed Promise<BillingResult<...>>, and billingContracts.ts
    // promises coded results rather than thrown errors. The timeout breaks both.
    expect(resolvedWith).toBeNull()
    expect(rejectedWith).toBeInstanceOf(DOMException)
    expect((rejectedWith as DOMException).name).toBe('AbortError')
  } finally { vi.useRealTimers() }
})
