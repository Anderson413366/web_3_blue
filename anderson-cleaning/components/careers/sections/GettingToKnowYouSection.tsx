'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import FormTextarea from '@/components/ui/FormTextarea'
import SectionWrapper from './SectionWrapper'
import FormRadioGroup from '@/components/ui/FormRadioGroup' // For yes/no questions like weekends/holidays

const GettingToKnowYouSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { formData, handleChange, t, formErrors } = context
  const data = formData.gettingToKnowYou
  // const availabilityData = formData.availability; // If weekendsHolidays is moved back here

  const getError = (field: string) => formErrors[`gettingToKnowYou.${field}`]
  // const getAvailabilityError = (field: string) => formErrors[`availability.${field}`];

  const questions: { key: keyof typeof data; labelKey: string }[] = [
    { key: 'knowAnyone', labelKey: 'knowAnyoneLabel' },
    { key: 'hardestJob', labelKey: 'hardestJobLabel' },
    { key: 'magicSpell', labelKey: 'magicSpellLabel' },
    { key: 'shorterWorkday', labelKey: 'shorterWorkdayLabel' },
    { key: 'winSomeoneOver', labelKey: 'winSomeoneOverLabel' },
    { key: 'addOneThingRestroom', labelKey: 'addOneThingRestroomLabel' },
    { key: 'helpedCoworker', labelKey: 'helpedCoworkerLabel' },
    { key: 'ruleDisagree', labelKey: 'ruleDisagreeLabel' },
    { key: 'lastBossDescription', labelKey: 'lastBossDescriptionLabel' },
    { key: 'fitInWell', labelKey: 'fitInWellLabel' },
    { key: 'getOutOfBed', labelKey: 'getOutOfBedLabel' },
    { key: 'busyOrDowntime', labelKey: 'busyOrDowntimeLabel' },
    { key: 'oneHourConversation', labelKey: 'oneHourConversationLabel' },
    { key: 'wishWeAsked', labelKey: 'wishWeAskedLabel' },
  ]

  return (
    <SectionWrapper titleKey="gettingToKnowYouSectionTitle" descriptionKey="gettingToKnowYouIntro">
      {questions.map((q) => (
        <FormTextarea
          key={q.key}
          label={t(q.labelKey) as string}
          name={q.key}
          value={data[q.key]}
          onChange={(e) => handleChange('gettingToKnowYou', q.key, e.target.value)}
          error={getError(q.key)}
        />
      ))}
      {/* Example if weekendsHolidays was here:
      <FormRadioGroup
        label={t('weekendsHolidaysLabel')}
        name="weekendsHolidays"
        options={[
          { value: "yes", label: t('yesLabel') },
          { value: "no", label: t('noLabel') }
        ]}
        selectedValue={availabilityData.weekendsHolidays}
        onChange={(value) => handleChange('availability', 'weekendsHolidays', value)}
        error={getAvailabilityError('weekendsHolidays')}
        isRequired // Example
      />
      */}
    </SectionWrapper>
  )
}

export default GettingToKnowYouSection
