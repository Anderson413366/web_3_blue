'use client'

import { AppProvider } from '@/lib/careers/AppContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CareersPage from '@/components/careers/CareersPage'

function CareersPageContent() {
  return (
    <>
      <Header />
      <CareersPage />
      <Footer />
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
