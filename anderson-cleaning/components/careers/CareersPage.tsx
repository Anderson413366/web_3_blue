'use client'


import React, { useContext, useState, useCallback } from 'react';
import { useAppContext } from '@/lib/careers/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import CareersHero from './CareersHero';
import WhyWorkSection from './WhyWorkSection';
import ApplicationForm from './ApplicationForm'; // This will house the form sections
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { BriefcaseIconCareers, MenuIconCareers, XIconCareers } from './icons';
import Alert from '@/components/ui/Alert';
import Modal from '@/components/ui/Modal';
import { generateCoverLetterSuggestion, generateInterviewTips, identifyStrengths } from '@/lib/careers/services/geminiService';
import { SparkType, InterviewPrepTip, SectionConfig, SectionError } from '@/lib/careers/types';
import { validateSectionData } from '@/lib/careers/utils/validation'; 

const CareersPage: React.FC = () => {
  const context = useAppContext();
  if (!context) throw new Error('AppContext not found');

  const {
    t, currentLanguage, theme, setTheme,
    formData, currentSectionIndex, setCurrentSectionIndex, SECTIONS_CONFIG,
    applicationStatus, setApplicationStatus,
    isLoadingSpark, setIsLoadingSpark, sparkResults, setSparkResults,
    formErrors, setFormErrors
  } = context;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);


  const CurrentSectionComponent = SECTIONS_CONFIG[currentSectionIndex]?.component;
  const currentSectionConfig = SECTIONS_CONFIG[currentSectionIndex];

  const handleNextSection = useCallback(() => {
    // Validate current section before proceeding
    const errors = validateSectionData(formData, currentSectionConfig.id, t as (key: string, options?: Record<string, string | number>) => string, currentSectionConfig.requiredFields || []);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (currentSectionIndex < SECTIONS_CONFIG.length - 1) {
        setCurrentSectionIndex(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        // This case should ideally not be hit if "Review Application" is the last step before true submission
        // True submission logic is handled by ReviewSection
      }
    } else {
       setApplicationStatus('error'); // Indicate validation error
       setTimeout(() => setApplicationStatus('idle'), 3000); // Reset after a delay
    }
  }, [formData, currentSectionIndex, setCurrentSectionIndex, t, SECTIONS_CONFIG, setFormErrors, currentSectionConfig, setApplicationStatus]);

  const handlePrevSection = useCallback(() => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      window.scrollTo(0, 0);
      setFormErrors({}); // Clear errors when moving back
    } else {
      setShowIntro(true); // Go back to intro sections
    }
  }, [currentSectionIndex, setCurrentSectionIndex, setFormErrors]);
  
  const handleGoToSection = (index: number) => {
    // Allow jumping only if target is review or already visited (or next immediate)
    if (SECTIONS_CONFIG[index].id === 'review' || index <= currentSectionIndex + 1) {
      // If jumping from review back to a section, we might not want to clear all errors
      // For now, basic jump
      setCurrentSectionIndex(index);
      setIsMobileMenuOpen(false);
      window.scrollTo(0, 0);
    }
  };

  const handleStartApplication = () => {
    setShowIntro(false);
    setCurrentSectionIndex(0); // Start with the first form section
    window.scrollTo(0,0);
  };

  const handleGenerateSpark = async (type: SparkType) => {
    setIsLoadingSpark(prev => ({ ...prev, [type]: true }));
    setSparkResults(prev => ({ ...prev, [type]: null }));
    let result: string | InterviewPrepTip[] | string[] | null = null;
    let promptDetailsMissing = false;

    try {
      const position = formData.jobDetails.applyingFor;
      const experiences = Object.entries(formData.jobDetails.experienceWith)
        .filter(([, value]) => value)
        .map(([key]) => t(`experienceWith_${key}Label`) as string); // Cast to string
      
      const knowYouAnswers = Object.entries(formData.gettingToKnowYou)
        .map(([key, answer]) => ({ questionKey: key, answer: String(answer) }))
        .filter(item => item.answer.trim() !== '');

      if (type === 'coverLetter') {
        if (!position || experiences.length === 0) {
          promptDetailsMissing = true;
          setSparkResults(prev => ({ ...prev, coverLetter: t('coverLetterPromptDetailsMissing') as string }));
        } else {
          result = await generateCoverLetterSuggestion(position, experiences, currentLanguage);
        }
      } else if (type === 'interviewPrep') {
        if (!position || knowYouAnswers.length === 0) {
          promptDetailsMissing = true;
          setSparkResults(prev => ({ ...prev, interviewPrep: [{ question: t('interviewPrepPromptDetailsMissing') as string, tip: '' }] }));
        } else {
          result = await generateInterviewTips(position, knowYouAnswers, currentLanguage);
        }
      } else if (type === 'strengths') {
         if (!position || experiences.length === 0 || knowYouAnswers.length === 0) {
          promptDetailsMissing = true;
          setSparkResults(prev => ({ ...prev, strengths: [t('strengthsPromptDetailsMissing') as string] }));
        } else {
          result = await identifyStrengths(position, experiences, knowYouAnswers, currentLanguage);
        }
      }
      
      if (!promptDetailsMissing) {
        setSparkResults(prev => ({ ...prev, [type]: result }));
      }

    } catch (error) {
      console.error(`Error generating ${type}:`, error);
      const errorKey = type === 'coverLetter' ? 'coverLetterSparkError' : type === 'interviewPrep' ? 'interviewPrepError' : 'strengthsError';
      setSparkResults(prev => ({ ...prev, [type]: t(errorKey) as string }));
    } finally {
      setIsLoadingSpark(prev => ({ ...prev, [type]: false }));
    }
  };


  const renderHeader = () => (
    <header className="bg-card dark:bg-slate-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BriefcaseIconCareers className="h-8 w-8 text-primary dark:text-blue-500" />
            <h1 className="ml-3 text-2xl font-bold text-gray-800 dark:text-gray-100">{t('applicationTitle') as string}</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <XIconCareers className="h-6 w-6" /> : <MenuIconCareers className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200 dark:border-slate-700">
            <div className="flex flex-col space-y-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            {!showIntro && SECTIONS_CONFIG.map((section, index) => (
              <Button
                key={section.id}
                variant={index === currentSectionIndex ? "default" : "ghost"}
                className="w-full justify-start mt-1"
                onClick={() => handleGoToSection(index)}
                disabled={index > currentSectionIndex + 1 && SECTIONS_CONFIG[index].id !== 'review'}
              >
                {t(section.titleKey) as string}
              </Button>
            ))}
             <Button variant="outline" className="w-full justify-start mt-1" onClick={() => { setShowIntro(true); setIsMobileMenuOpen(false); }}>
                {t('heroTitle') as string}
              </Button>
          </div>
        )}
      </div>
    </header>
  );

  const renderFooter = () => (
     <footer className="py-8 text-center text-sm text-gray-500 dark:text-slate-400 border-t border-gray-200 dark:border-slate-700 mt-12">
        &copy; {new Date().getFullYear()} Anderson Cleaning, Inc. All rights reserved.
        <p className="mt-1">{t('applicationSubtitle') as string}</p>
      </footer>
  );

  if (showIntro) {
    return (
      <>
        {renderHeader()}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CareersHero onStartApplication={handleStartApplication} />
          <WhyWorkSection />
        </main>
        {renderFooter()}
      </>
    );
  }
  
  const totalFormSteps = SECTIONS_CONFIG.filter(s => s.id !== 'hero' && s.id !== 'whyWork').length;
  const currentFormStep = currentSectionIndex + 1;


  return (
    <>
      {renderHeader()}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <ProgressBar
            currentStep={currentFormStep}
            totalSteps={totalFormSteps}
            currentTitle={t(SECTIONS_CONFIG[currentSectionIndex].titleKey) as string}
          />

          {applicationStatus === 'error' && Object.keys(formErrors).length > 0 && (
             <Alert type="error" message={t('incompleteSectionError') as string} className="mb-4" />
          )}
          {applicationStatus === 'error' && Object.keys(formErrors).length === 0 && ( // General submission error
             <Alert type="error" message={t('submissionErrorMessage') as string} className="mb-4" />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSectionIndex}
              initial={{ opacity: 0, x: currentSectionIndex > (context.currentSectionIndex -1 < 0 ? 0 : context.currentSectionIndex-1) ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: currentSectionIndex < (context.currentSectionIndex +1 >= SECTIONS_CONFIG.length ? context.currentSectionIndex : context.currentSectionIndex+1) ? 50 : -50 }}
              transition={{ duration: 0.3 }}
            >
              {CurrentSectionComponent && <CurrentSectionComponent />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={handlePrevSection}
              variant="outline"
              disabled={currentSectionIndex === 0 && showIntro}
              className="w-full sm:w-auto"
            >
              {t('prevButton') as string}
            </Button>
            {SECTIONS_CONFIG[currentSectionIndex].id !== 'review' && (
              <Button
                onClick={handleNextSection}
                className="w-full sm:w-auto"
                isLoading={applicationStatus === 'submitting'}
              >
                {currentSectionIndex === SECTIONS_CONFIG.length - 2 ? t('reviewAppButton') as string : t('nextButton') as string}
              </Button>
            )}
          </div>
        </div>
      </main>
       <Modal
        isOpen={applicationStatus === 'success'}
        onClose={() => {
          setApplicationStatus('idle');
          // Optionally reset form or redirect:
          // setFormData(INITIAL_FORM_DATA); 
          // setCurrentSectionIndex(0);
          setShowIntro(true); // Go back to intro
        }}
        title={t('submissionSuccessTitle') as string}
      >
        <p>{t('submissionSuccessMessage') as string}</p>
      </Modal>
      {renderFooter()}
    </>
  );
};

export default CareersPage;