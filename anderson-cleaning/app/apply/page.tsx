'use client'

import { AppProvider } from '@/lib/careers/AppContext'
import Header from '@/components/Header'
import CareersPage from '@/components/careers/CareersPage'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

function CareersPageContent() {
  return (
    <>
      <Header extraControls={<LanguageSwitcher />} />
      <CareersPage />
    </>
  )
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <AppProvider>
        <CareersPageContent />
      </AppProvider>
    </div>
  )
}
