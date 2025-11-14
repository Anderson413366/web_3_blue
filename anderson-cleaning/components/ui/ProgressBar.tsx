'use client'

import React from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  currentTitle: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, currentTitle }) => {
  const progressPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0

  return (
    <div className="mb-8 px-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-primary dark:text-blue-400">{currentTitle}</span>
        <span className="text-sm font-medium text-primary dark:text-blue-400">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
        <div
          className="bg-primary dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar
