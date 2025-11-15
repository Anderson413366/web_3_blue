import type { Metadata } from 'next'
import { AppProvider } from '@/lib/careers/AppContext'
import CareersPage from '@/components/careers/CareersPage'

export const metadata: Metadata = {
  title: 'Careers — Anderson Cleaning',
  description: 'Join our full-time, trained team with great benefits.',
}

export default function ApplyPage() {
  return (
    <AppProvider>
      <CareersPage />
    </AppProvider>
  )
}
