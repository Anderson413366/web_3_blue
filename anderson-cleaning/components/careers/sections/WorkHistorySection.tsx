'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import FormInput from '@/components/ui/FormInput'
import FormSelect from '@/components/ui/FormSelect'
import { Button } from '@/components/ui/Button'
import SectionWrapper from './SectionWrapper'
import { WorkHistoryEntry } from '@/lib/careers/types'
import { PlusCircleIconCareers, Trash2IconCareers } from '../icons'

const WorkHistorySection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { formData, handleChange, addWorkHistoryEntry, removeWorkHistoryEntry, t, formErrors } =
    context
  const data = formData.workHistory

  const getError = (index: number, field: keyof WorkHistoryEntry) =>
    formErrors[`workHistory.entries.${index}.${field}`]

  const yesNoOptions = [
    {
      value: '',
      label: t('prevMayWeContactPlaceholder', { defaultValue: 'Select Yes/No' }) as string,
    },
    { value: 'yes', label: t('yesLabel') as string },
    { value: 'no', label: t('noLabel') as string },
  ]

  return (
    <SectionWrapper titleKey="workHistorySectionTitle">
      <FormInput
        label={t('howManyEmployersLabel') as string}
        name="howManyEmployers"
        type="number"
        min="0"
        value={data.howManyEmployers}
        onChange={(e) => handleChange('workHistory', 'howManyEmployers', e.target.value)}
        placeholder={t('howManyEmployersPlaceholder') as string}
        error={formErrors['workHistory.howManyEmployers']}
      />

      {data.entries.map((entry, index) => (
        <div
          key={index}
          className="p-4 my-4 border border-gray-200 dark:border-slate-700 rounded-lg relative"
        >
          <h4 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300">
            {t('employer', { defaultValue: 'Employer' }) as string} #{index + 1}
          </h4>
          {index > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeWorkHistoryEntry(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              aria-label={t('removeEmployer', { defaultValue: 'Remove Employer' }) as string}
            >
              <Trash2IconCareers className="h-5 w-5" />
            </Button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <FormInput
              label={t('prevCompanyLabel') as string}
              name={`companyName-${index}`}
              value={entry.companyName}
              onChange={(e) =>
                handleChange('workHistory', 'entries', e.target.value, index, 'companyName')
              }
              error={getError(index, 'companyName')}
            />
            <FormInput
              label={t('prevPositionLabel') as string}
              name={`position-${index}`}
              value={entry.position}
              onChange={(e) =>
                handleChange('workHistory', 'entries', e.target.value, index, 'position')
              }
              error={getError(index, 'position')}
            />
            <FormInput
              label={t('prevFromLabel') as string}
              name={`fromDate-${index}`}
              value={entry.fromDate}
              placeholder="MM/YYYY"
              onChange={(e) =>
                handleChange('workHistory', 'entries', e.target.value, index, 'fromDate')
              }
              error={getError(index, 'fromDate')}
            />
            <FormInput
              label={t('prevToLabel') as string}
              name={`toDate-${index}`}
              value={entry.toDate}
              placeholder="MM/YYYY"
              onChange={(e) =>
                handleChange('workHistory', 'entries', e.target.value, index, 'toDate')
              }
              error={getError(index, 'toDate')}
            />
            <FormInput
              label={t('prevSupervisorLabel') as string}
              name={`supervisor-${index}`}
              value={entry.supervisor}
              onChange={(e) =>
                handleChange('workHistory', 'entries', e.target.value, index, 'supervisor')
              }
              className="md:col-span-2"
              error={getError(index, 'supervisor')}
            />
            <FormInput
              label={t('prevReasonForLeavingLabel') as string}
              name={`reasonForLeaving-${index}`}
              value={entry.reasonForLeaving}
              onChange={(e) =>
                handleChange('workHistory', 'entries', e.target.value, index, 'reasonForLeaving')
              }
              className="md:col-span-2"
              error={getError(index, 'reasonForLeaving')}
            />
            <FormSelect
              label={t('prevMayWeContactLabel') as string}
              name={`mayContact-${index}`}
              options={yesNoOptions}
              value={entry.mayContact}
              onChange={(e) =>
                handleChange('workHistory', 'entries', e.target.value, index, 'mayContact')
              }
              error={getError(index, 'mayContact')}
            />
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addWorkHistoryEntry} className="mt-4">
        <PlusCircleIconCareers className="h-5 w-5 mr-2" /> {t('addWorkHistoryButton') as string}
      </Button>
    </SectionWrapper>
  )
}

export default WorkHistorySection
