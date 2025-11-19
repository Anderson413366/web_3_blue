import React from 'react'

interface StructuredDataProps {
  schema: Record<string, unknown> | string
  id?: string
  nonce?: string | null
}

export default function StructuredData({ schema, id, nonce }: StructuredDataProps) {

  if (!schema) return null

  const json = typeof schema === 'string' ? schema : JSON.stringify(schema)

  return (
    <script
      id={id}
      type="application/ld+json"
      nonce={nonce ?? undefined}
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
