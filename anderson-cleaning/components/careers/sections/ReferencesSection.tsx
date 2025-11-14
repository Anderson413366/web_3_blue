'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import FormInput from '@/components/ui/FormInput'
import { Button } from '@/components/ui/Button'
import SectionWrapper from './SectionWrapper'
import { ReferenceEntry } from '@/lib/careers/types'
import { PlusCircleIconCareers, Trash2IconCareers } from '../icons'

const ReferencesSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { formData, handleChange, addReferenceEntry, removeReferenceEntry, t, formErrors } = context
  const data = formData.references

  const getError = (index: number, field: keyof ReferenceEntry) =>
    formErrors[`references.entries.${index}.${field}`]

  return (
    <SectionWrapper titleKey="referencesSectionTitle">
      {data.entries.map((entry, index) => (
        <div
          key={index}
          className="p-4 my-4 border border-gray-200 dark:border-slate-700 rounded-lg relative"
        >
          <h4 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300">
            {t('reference', { defaultValue: 'Reference' }) as string} #{index + 1}
          </h4>
          {index > 0 && ( // Allow removing if not the first one, or always allow removing
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeReferenceEntry(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              aria-label={t('removeReference', { defaultValue: 'Remove Reference' }) as string}
            >
              <Trash2IconCareers className="h-5 w-5" />
            </Button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <FormInput
              label={t('referenceNameLabel') as string}
              name={`referenceName-${index}`}
              value={entry.name}
              onChange={(e) => handleChange('references', 'entries', e.target.value, index, 'name')}
              error={getError(index, 'name')}
            />
            <FormInput
              label={t('referenceRelationshipLabel') as string}
              name={`referenceRelationship-${index}`}
              value={entry.relationship}
              onChange={(e) =>
                handleChange('references', 'entries', e.target.value, index, 'relationship')
              }
              error={getError(index, 'relationship')}
            />
            <FormInput
              label={t('referencePhoneLabel') as string}
              name={`referencePhone-${index}`}
              type="tel"
              value={entry.phone}
              onChange={(e) =>
                handleChange('references', 'entries', e.target.value, index, 'phone')
              }
              className="md:col-span-2"
              error={getError(index, 'phone')}
            />
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addReferenceEntry} className="mt-4">
        <PlusCircleIconCareers className="h-5 w-5 mr-2" /> {t('addReferenceButton') as string}
      </Button>
    </SectionWrapper>
  )
}

export default ReferencesSection
