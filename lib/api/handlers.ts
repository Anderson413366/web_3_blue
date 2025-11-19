import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { captureException, captureMessage } from '@sentry/nextjs'
import { checkRateLimit, getClientIdentifier } from '@/lib/api/rateLimit'
import type { SubmissionResult } from '@/lib/forms/submissions'

export class SubmissionError extends Error {
  constructor(message: string, public status = 400) {
    super(message)
  }
}

export interface SubmissionContext {
  request: NextRequest
  extras?: Record<string, unknown>
}

interface HandleSubmissionOptions<T> {
  request: NextRequest
  schema: z.ZodSchema<T>
  rateLimit: { limit: number; windowMs: number }
  parse?: (request: NextRequest) => Promise<{ payload: unknown; extras?: Record<string, unknown> }>
  sanitize?: (payload: unknown) => unknown
  honeypotCheck?: (payload: unknown) => boolean
  store: (data: T, context: SubmissionContext) => Promise<SubmissionResult>
  notify?: (data: T, context: SubmissionContext) => Promise<void>
  successMessage: string
}

export async function handleSubmission<T>({
  request,
  schema,
  rateLimit,
  parse,
  sanitize,
  honeypotCheck,
  store,
  notify,
  successMessage,
}: HandleSubmissionOptions<T>) {
  try {
    const clientId = getClientIdentifier(request)
    const limitResult = checkRateLimit(clientId, {
      limit: rateLimit.limit,
      window: rateLimit.windowMs,
    })

    if (!limitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const parsed = (await (parse ? parse(request) : defaultParser(request))) ?? { payload: {} }
    const payload = parsed.payload

    if (honeypotCheck && !honeypotCheck(payload)) {
      captureMessage('submission_honeypot_triggered', { level: 'warning', extra: { clientId } })
      return successResponse(successMessage, limitResult)
    }

    const sanitized = sanitize ? sanitize(payload) : payload
    const validationResult = schema.safeParse(sanitized)

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid form data', details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const submissionContext: SubmissionContext = { request, extras: parsed.extras }
    const dbResult = await store(validationResult.data, submissionContext)

    if (!dbResult.success) {
      captureException(new Error(dbResult.error), { tags: { module: 'submission-handler' } })
      return NextResponse.json(
        { success: false, error: 'Unable to save submission. Please try again later.' },
        { status: 500 }
      )
    }

    await notify?.(validationResult.data, submissionContext)
    captureMessage('submission_success', { level: 'info' })

    return successResponse(successMessage, limitResult)
  } catch (error) {
    if (error instanceof SubmissionError) {
      return NextResponse.json({ success: false, error: error.message }, { status: error.status })
    }

    captureException(error, { tags: { module: 'submission-handler' } })
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

async function defaultParser(request: NextRequest) {
  return { payload: await request.json(), extras: undefined }
}

function successResponse(message: string, rateLimit: { limit: number; remaining: number; reset: number }) {
  return new NextResponse(
    JSON.stringify({
      success: true,
      message,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': rateLimit.limit.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.reset.toString(),
      },
    }
  )
}
