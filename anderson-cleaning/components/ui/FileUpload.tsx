'use client'

import React, { useRef, useState, useCallback } from 'react'
import { Button } from './Button'
import { AppContext } from '@/lib/careers/AppContext'
import { EditIconCareers, FileSignatureIconCareers, Trash2IconCareers } from '../careers/icons' // Using CareersPage specific icons

interface FileUploadProps {
  label: string
  name: string
  helperText: string
  acceptedTypes?: string[] // e.g., ["image/jpeg", "image/png", "application/pdf"]
  maxFileSizeMB?: number
  currentFile: File | null
  onChange: (file: File | null) => void
  error?: string
  isRequired?: boolean
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  helperText,
  acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
  maxFileSizeMB = 5,
  currentFile,
  onChange,
  error: externalError,
  isRequired,
}) => {
  const context = React.useContext(AppContext)
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [internalError, setInternalError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalError(null)
    const file = event.target.files?.[0]
    if (file) {
      if (!acceptedTypes.includes(file.type)) {
        setInternalError(
          t('fileTypeError', {
            types: acceptedTypes.map((t) => t.split('/')[1].toUpperCase()).join(', '),
          }) as string
        )
        onChange(null)
        if (fileInputRef.current) fileInputRef.current.value = '' // Reset input
        return
      }
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        setInternalError(t('fileSizeError', { size: maxFileSizeMB }) as string)
        onChange(null)
        if (fileInputRef.current) fileInputRef.current.value = '' // Reset input
        return
      }
      onChange(file)
    } else {
      onChange(null)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    onChange(null)
    setInternalError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = '' // Reset the input field
    }
  }

  const displayError = externalError || internalError

  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
        {isRequired && (
          <span className="text-red-500 ml-1">{t('requiredFieldIndicator') as string}</span>
        )}
      </label>
      <div
        className={`mt-1 flex flex-col items-center px-6 pt-5 pb-6 border-2 ${displayError ? 'border-red-400' : 'border-gray-300 dark:border-slate-600'} border-dashed rounded-md`}
      >
        <div className="space-y-1 text-center">
          <FileSignatureIconCareers className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500" />
          {currentFile ? (
            <div className="mt-2 text-sm text-gray-600 dark:text-slate-300">
              <p className="font-medium text-primary dark:text-blue-400">{currentFile.name}</p>
              <p className="text-xs">({(currentFile.size / 1024 / 1024).toFixed(2)} MB)</p>
            </div>
          ) : (
            <div className="flex text-sm text-gray-600 dark:text-slate-400">
              <p className="pl-1">{helperText}</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            id={name}
            name={name}
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept={acceptedTypes.join(',')}
          />
        </div>
        <div className="mt-4 flex space-x-3">
          <Button type="button" onClick={triggerFileInput} variant="outline" size="sm">
            <EditIconCareers className="h-4 w-4 mr-2" />
            {currentFile
              ? (t('changeFileButton', { defaultValue: 'Change File' }) as string)
              : (t('uploadFileButton') as string)}
          </Button>
          {currentFile && (
            <Button type="button" onClick={handleRemoveFile} variant="destructive" size="sm">
              <Trash2IconCareers className="h-4 w-4 mr-2" />
              {t('removeFileButton') as string}
            </Button>
          )}
        </div>
      </div>
      {displayError && (
        <p className="mt-2 text-xs text-red-500 dark:text-red-400">{displayError}</p>
      )}
    </div>
  )
}

export default FileUpload
