'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import FormCheckbox from '@/components/ui/FormCheckbox'
import SectionWrapper from './SectionWrapper'

const StatementsSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { formData, handleChange, t, formErrors } = context
  const data = formData.statements

  const getError = (field: keyof typeof data) => formErrors[`statements.${field}`]

  const statements = [
    {
      key: 'drugTestingAck' as keyof typeof data,
      statementKey: 'drugTestingStatement',
      required: true,
    },
    {
      key: 'applicantStatementAck' as keyof typeof data,
      statementKey: 'applicantStatement',
      required: true,
    },
    {
      key: 'partTimeStatementAck' as keyof typeof data,
      statementKey: 'partTimeStatement',
      required: formData.availability.generalAvailability === 'part_time',
    }, // Conditional requirement
  ]

  return (
    <SectionWrapper titleKey="statementsSectionTitle">
      {statements.map(
        (stmt) =>
          (stmt.required ||
            (formData.availability.generalAvailability === 'part_time' &&
              stmt.key === 'partTimeStatementAck')) && ( // Render if required or conditionally required and condition met
            <div
              key={stmt.key}
              className="mb-6 p-4 border border-gray-200 dark:border-slate-700 rounded-md bg-gray-50 dark:bg-slate-800/50"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-line">
                {t(stmt.statementKey) as string}
              </p>
              <FormCheckbox
                label={t('acknowledgeLabel') as string}
                name={stmt.key}
                checked={data[stmt.key]}
                onChange={(e) => handleChange('statements', stmt.key, e.target.checked)}
                error={getError(stmt.key)}
              />
            </div>
          )
      )}
    </SectionWrapper>
  )
}

export default StatementsSection
