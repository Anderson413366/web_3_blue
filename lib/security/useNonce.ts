'use client'

import { useContext } from 'react'
import { NonceContext } from './nonce-context'

export function useNonce() {
  const nonce = useContext(NonceContext)
  return nonce || undefined
}
