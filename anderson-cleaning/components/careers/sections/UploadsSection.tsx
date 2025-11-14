'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import FileUpload from '@/components/ui/FileUpload'
import FormTextarea from '@/components/ui/FormTextarea'
import SectionWrapper from './SectionWrapper'
import CoverLetterSpark from '../sparks/CoverLetterSpark'

const UploadsSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { formData, handleFileUpload, handleChange, t, formErrors } = context
  const data = formData.uploads

  const getError = (field: string) => formErrors[`uploads.${field}`]

  return (
    <SectionWrapper titleKey="uploadsSectionTitle">
      <FileUpload
        label={t('driversLicenseLabel') as string}
        name="driversLicense"
        helperText={t('driversLicenseHelper') as string}
        currentFile={data.driversLicense}
        onChange={(file) => handleFileUpload('driversLicense', file)}
        error={getError('driversLicense')}
        isRequired
        acceptedTypes={['image/jpeg', 'image/png', 'application/pdf']}
        maxFileSizeMB={5}
      />
      <FileUpload
        label={t('resumeLabel') as string}
        name="resume"
        helperText={t('resumeHelper') as string}
        currentFile={data.resume}
        onChange={(file) => handleFileUpload('resume', file)}
        error={getError('resume')}
        acceptedTypes={[
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]} // PDF, DOC, DOCX
        maxFileSizeMB={5}
      />

      <div className="my-6">
        <FormTextarea
          label={t('coverLetterLabel') as string}
          name="coverLetterText"
          value={data.coverLetterText}
          onChange={(e) => handleChange('uploads', 'coverLetterText', e.target.value)}
          placeholder={t('coverLetterPlaceholder') as string}
          rows={8}
          error={getError('coverLetterText')}
        />
        <CoverLetterSpark
          onSuggestion={(suggestion) => handleChange('uploads', 'coverLetterText', suggestion)}
        />
      </div>
    </SectionWrapper>
  )
}

export default UploadsSection
