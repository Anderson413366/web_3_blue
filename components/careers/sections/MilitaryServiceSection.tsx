'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import FormInput from '@/components/ui/FormInput'
import SectionWrapper from './SectionWrapper'

const MilitaryServiceSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { formData, handleChange, t, formErrors } = context
  const data = formData.militaryService

  const getError = (field: string) => formErrors[`militaryService.${field}`]

  return (
    <SectionWrapper titleKey="militaryServiceSectionTitle">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        <FormInput
          label={t('branchLabel') as string}
          name="branch"
          value={data.branch}
          onChange={(e) => handleChange('militaryService', 'branch', e.target.value)}
          error={getError('branch')}
        />
        <FormInput
          label={t('rankAtDischargeLabel') as string}
          name="rankAtDischarge"
          value={data.rankAtDischarge}
          onChange={(e) => handleChange('militaryService', 'rankAtDischarge', e.target.value)}
          error={getError('rankAtDischarge')}
        />
        <FormInput
          label={t('militaryFromLabel') as string}
          name="serviceFrom"
          value={data.serviceFrom}
          placeholder="MM/YYYY"
          onChange={(e) => handleChange('militaryService', 'serviceFrom', e.target.value)}
          error={getError('serviceFrom')}
        />
        <FormInput
          label={t('militaryToLabel') as string}
          name="serviceTo"
          value={data.serviceTo}
          placeholder="MM/YYYY"
          onChange={(e) => handleChange('militaryService', 'serviceTo', e.target.value)}
          error={getError('serviceTo')}
        />
        <FormInput
          label={t('typeOfDischargeLabel') as string}
          name="typeOfDischarge"
          value={data.typeOfDischarge}
          onChange={(e) => handleChange('militaryService', 'typeOfDischarge', e.target.value)}
          className="md:col-span-2"
          error={getError('typeOfDischarge')}
        />
      </div>
    </SectionWrapper>
  )
}

export default MilitaryServiceSection
