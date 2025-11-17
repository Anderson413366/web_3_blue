'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

// This component might be vestigial if CareersPage.tsx handles direct rendering of sections.
// However, it can serve as a wrapper if more complex form-wide logic is needed later.
// For now, it will just render the current section.

const ApplicationForm: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')

  const { currentSectionIndex, SECTIONS_CONFIG } = context
  const CurrentSectionComponent = SECTIONS_CONFIG[currentSectionIndex]?.component

  if (!CurrentSectionComponent) {
    return <div className="text-center text-red-500">Error: Form section not found.</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSectionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="bg-card dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-xl"
      >
        <CurrentSectionComponent />
      </motion.div>
    </AnimatePresence>
  )
}

export default ApplicationForm
