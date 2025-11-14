import React from 'react'

export type LanguageCode = 'en' | 'es' | 'pt-BR' | 'ro'

export interface Translations {
  [key: string]:
    | string
    | { title: string; description: string }[]
    | { value: string; label: string }[]
    | string[]
}

export interface PersonalInfoShape {
  firstName: string
  lastName: string
  streetAddress: string
  addressLine2: string
  city: string
  stateProvince: string
  zipCode: string
  email: string
  phone: string
}

export interface JobDetailsShape {
  applyingFor: string
  howDidYouHear: string
  liftCarry: string
  physicalAbilityGeneral: string
  physicalAbilityExplanation: string
  performDuties: string
  performDutiesExplanation: string
  hasDriversLicense: boolean
  otherAbility: string
  experienceWith: Record<string, boolean> // e.g. { houseCleaning: true, officeCleaning: false }
  otherExperienceText: string
}

export interface AvailabilityShape {
  workLocations: Record<string, boolean> // e.g. { Agawam: true, Springfield: false }
  otherLocationText: string
  generalAvailability: string
  hoursPerWeek: string
  daysAvailable: Record<string, boolean> // e.g. { Monday: true, Tuesday: false }
  shiftsAvailable: Record<string, boolean> // e.g. { Morning: true, Afternoon: false }
  otherShiftText: string
  weekendsHolidays: string // 'Yes' / 'No' / ''
}

export interface EducationShape {
  educationLevel: string
}

export interface WorkHistoryEntry {
  companyName: string
  streetAddress: string
  city: string
  zipCode: string
  fromDate: string
  toDate: string
  position: string
  supervisor: string
  reasonForLeaving: string
  mayContact: string // 'Yes' / 'No' / ''
}

export interface WorkHistoryShape {
  howManyEmployers: string
  entries: WorkHistoryEntry[]
}

export interface ReferenceEntry {
  name: string
  relationship: string
  phone: string
}
export interface ReferencesShape {
  entries: ReferenceEntry[]
}

export interface MilitaryServiceShape {
  branch: string
  rankAtDischarge: string
  serviceFrom: string
  serviceTo: string
  typeOfDischarge: string
}

export interface GettingToKnowYouShape {
  knowAnyone: string
  hardestJob: string
  magicSpell: string
  shorterWorkday: string
  winSomeoneOver: string
  addOneThingRestroom: string
  helpedCoworker: string
  ruleDisagree: string
  lastBossDescription: string
  fitInWell: string
  getOutOfBed: string
  busyOrDowntime: string
  // weekendsHolidays is in AvailabilityShape now
  oneHourConversation: string
  wishWeAsked: string
}

export interface StatementsShape {
  drugTestingAck: boolean
  applicantStatementAck: boolean
  partTimeStatementAck: boolean
}

export interface UploadsShape {
  driversLicense: File | null
  resume: File | null
  coverLetterText: string
}

export interface FormDataShape {
  personalInfo: PersonalInfoShape
  jobDetails: JobDetailsShape
  availability: AvailabilityShape
  education: EducationShape
  workHistory: WorkHistoryShape
  references: ReferencesShape
  militaryService: MilitaryServiceShape
  gettingToKnowYou: GettingToKnowYouShape
  statements: StatementsShape
  uploads: UploadsShape
}

export type SparkType = 'coverLetter' | 'interviewPrep' | 'strengths'

export interface InterviewPrepTip {
  question: string
  tip: string
}
export type SparkResult = string | InterviewPrepTip[] | string[]

export interface SectionConfig {
  id: keyof FormDataShape | 'review' | 'hero' | 'whyWork'
  titleKey: string
  requiredFields?: string[] // e.g. ["personalInfo.firstName", "personalInfo.lastName"]
  component: React.FC<SectionProps>
}

export interface AppContextType {
  currentLanguage: LanguageCode
  setCurrentLanguage: (lang: LanguageCode) => void
  t: (key: string, options?: Record<string, string | number>) => Translations[string] // Changed return type
  formData: FormDataShape
  setFormData: React.Dispatch<React.SetStateAction<FormDataShape>>
  handleChange: (
    section: keyof FormDataShape,
    field: string,
    value: any,
    subIndex?: number,
    subField?: string
  ) => void
  handleMultiCheckboxChange: (
    section: keyof FormDataShape,
    field: string,
    option: string,
    checked: boolean
  ) => void
  addWorkHistoryEntry: () => void
  removeWorkHistoryEntry: (index: number) => void
  addReferenceEntry: () => void
  removeReferenceEntry: (index: number) => void
  handleFileUpload: (field: 'driversLicense' | 'resume', file: File | null) => void
  currentSectionIndex: number
  setCurrentSectionIndex: React.Dispatch<React.SetStateAction<number>>
  SECTIONS_CONFIG: SectionConfig[]
  applicationStatus: 'idle' | 'submitting' | 'success' | 'error'
  setApplicationStatus: React.Dispatch<
    React.SetStateAction<'idle' | 'submitting' | 'success' | 'error'>
  >
  isLoadingSpark: Record<SparkType, boolean>
  setIsLoadingSpark: React.Dispatch<React.SetStateAction<Record<SparkType, boolean>>>
  sparkResults: Record<SparkType, SparkResult | null>
  setSparkResults: React.Dispatch<React.SetStateAction<Record<SparkType, SparkResult | null>>>
  formErrors: SectionError
  setFormErrors: React.Dispatch<React.SetStateAction<SectionError>>
}

export interface SectionProps {
  // Props common to all section components
}

// For field-level errors, path based: e.g. { "personalInfo.firstName": "First name is required" }
export type SectionError = Record<string, string>

// Props for individual form input components
export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string
  isRequired?: boolean
}

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
  error?: string
  isRequired?: boolean
}

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  options: { value: string; label: string }[]
  error?: string
  isRequired?: boolean
}

export interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string // For a single checkbox if needed
}

export interface FormCheckboxGroupProps {
  label: string
  namePrefix: string // e.g., "experienceWith"
  options: string[] // Keys for the options, labels will come from translations
  values: Record<string, boolean> // Current checked state e.g., { houseCleaning: true }
  onChange: (optionKey: string, checked: boolean) => void
  error?: string // For the group as a whole
  translationKeyPrefix: string // e.g., "experienceWith" to fetch "houseCleaningLabel", "officeCleaningLabel"
}

export interface FormRadioGroupProps {
  label: string
  name: string
  options: { value: string; label: string }[]
  selectedValue: string
  onChange: (value: string) => void
  error?: string
  isRequired?: boolean
}

export interface IconProps {
  className?: string
}

// ShadCN-like stubs (from user input, simplified)
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'primary' | 'accent'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
  isLoading?: boolean
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

// Tooltip Context (from user input)
export interface TooltipContextType {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  content: React.ReactNode | null
  setContent: (content: React.ReactNode | null) => void
  triggerRef: React.RefObject<HTMLElement> | null
  setTriggerRef: (ref: React.RefObject<HTMLElement> | null) => void
}
