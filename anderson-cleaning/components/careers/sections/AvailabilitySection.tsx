'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import FormInput from '@/components/ui/FormInput'
import FormSelect from '@/components/ui/FormSelect'
import FormCheckboxGroup from '@/components/ui/FormCheckboxGroup'
import FormTextarea from '@/components/ui/FormTextarea'
import SectionWrapper from './SectionWrapper'
import { LocationOptionKeys, DayOptionKeys, ShiftOptionKeys } from '@/lib/careers/constants'
import FormRadioGroup from '@/components/ui/FormRadioGroup'

const AvailabilitySection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { formData, handleChange, handleMultiCheckboxChange, t, formErrors } = context
  const data = formData.availability

  const getError = (field: string) => formErrors[`availability.${field}`]

  const generalAvailabilityOptions = t('generalAvailabilityOptions') as {
    value: string
    label: string
  }[]
  const yesNoOptions = [
    {
      value: '',
      label: t('prevMayWeContactPlaceholder', { defaultValue: 'Select Yes/No' }) as string,
    },
    { value: 'yes', label: t('yesLabel') as string },
    { value: 'no', label: t('noLabel') as string },
  ]

  return (
    <SectionWrapper titleKey="availabilitySectionTitle">
      <FormCheckboxGroup
        label={t('availableWorkLocationsLabel') as string}
        namePrefix="workLocations"
        options={LocationOptionKeys}
        values={data.workLocations}
        onChange={(option, checked) =>
          handleMultiCheckboxChange('availability', 'workLocations', option, checked)
        }
        translationKeyPrefix="" // Labels are direct e.g. AgawamLabel
        error={getError('workLocations')}
      />
      <FormInput
        label={t('otherLocationLabel') as string}
        name="otherLocationText"
        value={data.otherLocationText}
        onChange={(e) => handleChange('availability', 'otherLocationText', e.target.value)}
        placeholder={t('otherSpecifyPlaceholder') as string}
        error={getError('otherLocationText')}
      />
      <FormSelect
        label={t('ableToWorkGeneralLabel') as string}
        name="generalAvailability"
        options={generalAvailabilityOptions}
        value={data.generalAvailability}
        onChange={(e) => handleChange('availability', 'generalAvailability', e.target.value)}
        error={getError('generalAvailability')}
        isRequired
      />
      <FormInput
        label={t('hoursPerWeekLabel') as string}
        name="hoursPerWeek"
        value={data.hoursPerWeek}
        onChange={(e) => handleChange('availability', 'hoursPerWeek', e.target.value)}
        placeholder={t('hoursPerWeekPlaceholder') as string}
        error={getError('hoursPerWeek')}
      />
      <FormCheckboxGroup
        label={t('daysAvailableLabel') as string}
        namePrefix="daysAvailable"
        options={DayOptionKeys}
        values={data.daysAvailable}
        onChange={(option, checked) =>
          handleMultiCheckboxChange('availability', 'daysAvailable', option, checked)
        }
        translationKeyPrefix="" // Labels are direct e.g. MondayLabel
        error={getError('daysAvailable')}
      />
      <FormCheckboxGroup
        label={t('shiftsAvailableLabel') as string}
        namePrefix="shiftsAvailable"
        options={ShiftOptionKeys}
        values={data.shiftsAvailable}
        onChange={(option, checked) =>
          handleMultiCheckboxChange('availability', 'shiftsAvailable', option, checked)
        }
        translationKeyPrefix="" // Labels are direct e.g. MorningLabel
        error={getError('shiftsAvailable')}
      />
      <FormTextarea
        label={t('otherShiftLabel') as string}
        name="otherShiftText"
        value={data.otherShiftText}
        onChange={(e) => handleChange('availability', 'otherShiftText', e.target.value)}
        placeholder={t('otherShiftLabel') as string}
        error={getError('otherShiftText')}
      />
      <FormRadioGroup
        label={t('weekendsHolidaysLabel') as string}
        name="weekendsHolidays"
        options={yesNoOptions}
        selectedValue={data.weekendsHolidays}
        onChange={(value) => handleChange('availability', 'weekendsHolidays', value)}
        error={getError('weekendsHolidays')}
        isRequired
      />
    </SectionWrapper>
  )
}

export default AvailabilitySection
