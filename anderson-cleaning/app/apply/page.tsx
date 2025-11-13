'use client'

import { Metadata } from 'next'
import { AppProvider } from '@/lib/careers/AppContext'
import CareersPage from '@/components/careers/CareersPage'

export default function ApplyPage() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <CareersPage />
      </div>
    </AppProvider>
  )
}
