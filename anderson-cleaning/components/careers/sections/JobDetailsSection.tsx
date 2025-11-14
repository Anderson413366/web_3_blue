'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import FormInput from '@/components/ui/FormInput'
import FormSelect from '@/components/ui/FormSelect'
import FormCheckbox from '@/components/ui/FormCheckbox'
import FormCheckboxGroup from '@/components/ui/FormCheckboxGroup'
import FormRadioGroup from '@/components/ui/FormRadioGroup'
import FormTextarea from '@/components/ui/FormTextarea'
import SectionWrapper from './SectionWrapper'
import { ExperienceOptionKeys } from '@/lib/careers/constants'

const JobDetailsSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { formData, handleChange, handleMultiCheckboxChange, t, formErrors } = context
  const data = formData.jobDetails

  const getError = (field: string) => formErrors[`jobDetails.${field}`]

  const positionOptions = t('positionOptions') as { value: string; label: string }[]
  const liftOptions = t('liftOptions') as { value: string; label: string }[]
  const physicalAbilityOptions = t('physicalAbilityOptions') as { value: string; label: string }[]

  const yesNoOptions = [
    {
      value: '',
      label: t('prevMayWeContactPlaceholder', { defaultValue: 'Select Yes/No' }) as string,
    },
    { value: 'yes', label: t('yesLabel') as string },
    { value: 'no', label: t('noLabel') as string },
  ]
  const performDutiesOptions = [
    {
      value: '',
      label: t('prevMayWeContactPlaceholder', { defaultValue: 'Select Yes/No/Other' }) as string,
    },
    { value: 'yes', label: t('yesLabel') as string },
    { value: 'no', label: t('noLabel') as string },
    { value: 'other', label: t('otherLabel') as string },
  ]

  return (
    <SectionWrapper titleKey="jobDescSectionTitle">
      <FormSelect
        label={t('applyingForLabel') as string}
        name="applyingFor"
        options={positionOptions}
        value={data.applyingFor}
        onChange={(e) => handleChange('jobDetails', 'applyingFor', e.target.value)}
        error={getError('applyingFor')}
        isRequired
      />
      <FormInput
        label={t('howDidYouHearLabel') as string}
        name="howDidYouHear"
        value={data.howDidYouHear}
        onChange={(e) => handleChange('jobDetails', 'howDidYouHear', e.target.value)}
        placeholder={t('howDidYouHearPlaceholder') as string}
        error={getError('howDidYouHear')}
      />
      <FormSelect
        label={t('liftCarryLabel') as string}
        name="liftCarry"
        options={liftOptions}
        value={data.liftCarry}
        onChange={(e) => handleChange('jobDetails', 'liftCarry', e.target.value)}
        error={getError('liftCarry')}
        isRequired
      />
      <FormSelect
        label={t('iAmAbleToLabelGeneral') as string}
        name="physicalAbilityGeneral"
        options={physicalAbilityOptions}
        value={data.physicalAbilityGeneral}
        onChange={(e) => handleChange('jobDetails', 'physicalAbilityGeneral', e.target.value)}
        error={getError('physicalAbilityGeneral')}
        isRequired
      />
      {data.physicalAbilityGeneral === 'some_restrictions' && (
        <FormTextarea
          label={t('physicalAbilityExplanationLabel') as string}
          name="physicalAbilityExplanation"
          value={data.physicalAbilityExplanation}
          onChange={(e) => handleChange('jobDetails', 'physicalAbilityExplanation', e.target.value)}
          placeholder={t('physicalAbilityExplanationPlaceholder') as string}
          error={getError('physicalAbilityExplanation')}
        />
      )}
      <FormRadioGroup
        label={t('performDutiesLabel') as string}
        name="performDuties"
        options={performDutiesOptions}
        selectedValue={data.performDuties}
        onChange={(value) => handleChange('jobDetails', 'performDuties', value)}
        error={getError('performDuties')}
        isRequired
      />
      {(data.performDuties === 'no' || data.performDuties === 'other') && (
        <FormTextarea
          label={t('performDutiesOtherPlaceholder') as string}
          name="performDutiesExplanation"
          value={data.performDutiesExplanation}
          onChange={(e) => handleChange('jobDetails', 'performDutiesExplanation', e.target.value)}
          placeholder={t('performDutiesOtherPlaceholder') as string}
          error={getError('performDutiesExplanation')}
        />
      )}
      <FormCheckbox
        label={t('driveMultipleBuildingsLabel') as string}
        name="hasDriversLicense"
        checked={data.hasDriversLicense}
        onChange={(e) => handleChange('jobDetails', 'hasDriversLicense', e.target.checked)}
        error={getError('hasDriversLicense')}
      />
      <FormTextarea
        label={t('otherAbilityLabel') as string}
        name="otherAbility"
        value={data.otherAbility}
        onChange={(e) => handleChange('jobDetails', 'otherAbility', e.target.value)}
        placeholder={t('otherAbilityPlaceholder') as string}
        error={getError('otherAbility')}
      />
      <FormCheckboxGroup
        label={t('experienceWithLabel') as string}
        namePrefix="experienceWith"
        options={ExperienceOptionKeys}
        values={data.experienceWith}
        onChange={(option, checked) =>
          handleMultiCheckboxChange('jobDetails', 'experienceWith', option, checked)
        }
        translationKeyPrefix="experienceWith" // For fetching "experienceWith_houseCleaningLabel", etc.
        error={getError('experienceWith')}
      />
      <FormTextarea
        label={t('otherExperienceLabel') as string}
        name="otherExperienceText"
        value={data.otherExperienceText}
        onChange={(e) => handleChange('jobDetails', 'otherExperienceText', e.target.value)}
        placeholder={t('otherSpecifyPlaceholder') as string}
        error={getError('otherExperienceText')}
      />
    </SectionWrapper>
  )
}

export default JobDetailsSection
