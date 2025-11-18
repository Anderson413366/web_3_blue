'use client'

import React from 'react'
import { useNonce } from '@/lib/security/useNonce'

interface StructuredDataProps {
  schema: Record<string, unknown> | string
  id?: string
}

export default function StructuredData({ schema, id }: StructuredDataProps) {
  const nonce = useNonce()

  if (!schema) return null

  const json = typeof schema === 'string' ? schema : JSON.stringify(schema)

  return (
    <script
      id={id}
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
