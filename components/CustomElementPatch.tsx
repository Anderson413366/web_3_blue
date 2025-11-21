'use client'

import { useEffect } from 'react'

export default function CustomElementPatch() {
  useEffect(() => {
    const win = window as typeof window & {
      MceAutosizeTextarea?: CustomElementConstructor
      defineMceAutosize?: () => CustomElementConstructor
    }

    if (!customElements.get('mce-autosize-textarea')) {
      const ctor = win.MceAutosizeTextarea || win.defineMceAutosize?.()
      if (ctor) {
        customElements.define('mce-autosize-textarea', ctor)
      }
    }
  }, [])

  return null
}
