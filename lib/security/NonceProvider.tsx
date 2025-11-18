import React from 'react'
import { headers } from 'next/headers'
import { NonceContext } from './nonce-context'

interface NonceProviderProps {
  children: React.ReactNode
}

export function NonceProvider({ children }: NonceProviderProps) {
  const headersList = headers()
  const nonce = headersList.get('x-nonce') || null

  return <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>
}
