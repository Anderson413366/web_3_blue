'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import FormInput from '@/components/ui/FormInput'
import SectionWrapper from './SectionWrapper'

const PersonalInfoSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { formData, handleChange, t, formErrors } = context
  const data = formData.personalInfo

  const getError = (field: string) => formErrors[`personalInfo.${field}`]

  return (
    <SectionWrapper titleKey="personalInfoSectionTitle">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        <FormInput
          label={t('firstNameLabel') as string}
          name="firstName"
          value={data.firstName}
          onChange={(e) => handleChange('personalInfo', 'firstName', e.target.value)}
          placeholder={t('firstNamePlaceholder') as string}
          error={getError('firstName')}
          isRequired
        />
        <FormInput
          label={t('lastNameLabel') as string}
          name="lastName"
          value={data.lastName}
          onChange={(e) => handleChange('personalInfo', 'lastName', e.target.value)}
          placeholder={t('lastNamePlaceholder') as string}
          error={getError('lastName')}
          isRequired
        />
        <FormInput
          label={t('streetAddressLabel') as string}
          name="streetAddress"
          value={data.streetAddress}
          onChange={(e) => handleChange('personalInfo', 'streetAddress', e.target.value)}
          placeholder={t('streetAddressPlaceholder') as string}
          className="md:col-span-2"
          error={getError('streetAddress')}
          isRequired
        />
        <FormInput
          label={t('addressLine2Label') as string}
          name="addressLine2"
          value={data.addressLine2}
          onChange={(e) => handleChange('personalInfo', 'addressLine2', e.target.value)}
          placeholder={t('addressLine2Placeholder') as string}
          className="md:col-span-2"
          error={getError('addressLine2')}
        />
        <FormInput
          label={t('cityLabel') as string}
          name="city"
          value={data.city}
          onChange={(e) => handleChange('personalInfo', 'city', e.target.value)}
          placeholder={t('cityPlaceholder') as string}
          error={getError('city')}
          isRequired
        />
        <FormInput
          label={t('stateProvinceLabel') as string}
          name="stateProvince"
          value={data.stateProvince}
          onChange={(e) => handleChange('personalInfo', 'stateProvince', e.target.value)}
          placeholder={t('stateProvincePlaceholder') as string}
          error={getError('stateProvince')}
          isRequired
        />
        <FormInput
          label={t('zipCodeLabel') as string}
          name="zipCode"
          value={data.zipCode}
          onChange={(e) => handleChange('personalInfo', 'zipCode', e.target.value)}
          placeholder={t('zipCodePlaceholder') as string}
          error={getError('zipCode')}
          isRequired
        />
        <FormInput
          label={t('emailLabel') as string}
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
          placeholder={t('emailPlaceholder') as string}
          error={getError('email')}
          isRequired
        />
        <FormInput
          label={t('phoneLabel') as string}
          name="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
          placeholder={t('phonePlaceholder') as string}
          error={getError('phone')}
          isRequired
        />
      </div>
    </SectionWrapper>
  )
}

export default PersonalInfoSection
