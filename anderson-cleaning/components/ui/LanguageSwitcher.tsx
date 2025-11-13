
import React, { useContext } from 'react';
import { AppContext } from '@/lib/careers/AppContext';
import { LanguageCode } from '@/lib/careers/types';
import { Button } from './Button';
import { GlobeIconCareers } from '../careers/icons';

const LanguageSwitcher: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('AppContext not found');

  const { currentLanguage, setCurrentLanguage, t } = context;

  const languages: { code: LanguageCode; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' },
  ];

  return (
    <div className="flex items-center space-x-2">
       <GlobeIconCareers className="h-5 w-5 text-gray-600 dark:text-slate-400" />
      <label htmlFor="language-select" className="sr-only">{t('selectLanguage') as string}</label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) => setCurrentLanguage(e.target.value as LanguageCode)}
        className="block w-full pl-3 pr-10 py-2 text-sm bg-card border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-primary focus:border-primary rounded-md"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;