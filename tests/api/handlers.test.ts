import { NextRequest } from 'next/server'
import { z } from 'zod'
import { handleSubmission } from '@/lib/api/handlers'

jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
  captureMessage: jest.fn(),
}))

jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server')
  class MockNextResponse extends Response {
    constructor(body?: BodyInit | null, init?: ResponseInit) {
      super(body, init)
    }

    static json(body: unknown, init?: ResponseInit) {
      return new MockNextResponse(JSON.stringify(body), {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...(init?.headers as Record<string, string>) ?? {},
        },
      })
    }
  }

  return {
    ...actual,
    NextResponse: MockNextResponse,
  }
})

jest.mock('@/lib/api/rateLimit', () => ({
  checkRateLimit: jest.fn(() => ({ success: true, limit: 5, remaining: 4, reset: Date.now() + 1000 })),
  getClientIdentifier: jest.fn(() => 'client-1'),
}))

describe('handleSubmission', () => {
  const schema = z.object({ name: z.string() })
  const createRequest = (payload: Record<string, unknown>) => ({
    json: jest.fn().mockResolvedValue(payload),
    headers: new Headers(),
  }) as unknown as NextRequest

  it('returns success response when store and notify succeed', async () => {
    const store = jest.fn().mockResolvedValue({ success: true })
    const notify = jest.fn().mockResolvedValue(undefined)

    const response = await handleSubmission({
      request: createRequest({ name: 'Ada' }),
      schema,
      rateLimit: { limit: 5, windowMs: 1000 },
      store,
      notify,
      successMessage: 'ok',
    })

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(store).toHaveBeenCalledWith({ name: 'Ada' }, expect.any(Object))
    expect(notify).toHaveBeenCalled()
  })

  it('short-circuits when honeypot is triggered', async () => {
    const store = jest.fn()

    const response = await handleSubmission({
      request: createRequest({ name: 'Bot', website: 'spam' }),
      schema,
      rateLimit: { limit: 5, windowMs: 1000 },
      store,
      honeypotCheck: () => false,
      successMessage: 'ok',
    })

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(store).not.toHaveBeenCalled()
  })

  it('returns 500 when persistence fails', async () => {
    const store = jest.fn().mockResolvedValue({ success: false, error: 'db down' })

    const response = await handleSubmission({
      request: createRequest({ name: 'Grace' }),
      schema,
      rateLimit: { limit: 5, windowMs: 1000 },
      store,
      successMessage: 'ok',
    })

    expect(response.status).toBe(500)
    const body = await response.json()
    expect(body.success).toBe(false)
  })
})
