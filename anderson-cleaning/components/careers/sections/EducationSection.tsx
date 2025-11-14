'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import FormSelect from '@/components/ui/FormSelect'
import SectionWrapper from './SectionWrapper'

const EducationSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { formData, handleChange, t, formErrors } = context
  const data = formData.education

  const getError = (field: string) => formErrors[`education.${field}`]
  const educationOptions = t('educationOptions') as { value: string; label: string }[]

  return (
    <SectionWrapper titleKey="educationSectionTitle">
      <FormSelect
        label={t('educationLevelLabel') as string}
        name="educationLevel"
        options={educationOptions}
        value={data.educationLevel}
        onChange={(e) => handleChange('education', 'educationLevel', e.target.value)}
        error={getError('educationLevel')}
        isRequired
      />
    </SectionWrapper>
  )
}

export default EducationSection
