
import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Language, LanguageOption } from '@/types/language';
import { languageOptions } from '@/lib/translations';
import '../lib/i18n'; // Import i18n configuration

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, defaultValue?: string) => string;
  languageOptions: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { t, i18n } = useTranslation();
  
  // Get current language as our Language type
  const language = i18n.language.split('-')[0] as Language;

  // Set language function that works with i18next
  const setLanguage = (newLanguage: Language) => {
    i18n.changeLanguage(newLanguage);
  };

  // Translation function that supports both dot notation and default values
  const translate = (key: string, defaultValue?: string): string => {
    return t(key, defaultValue || key);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t: translate, 
      languageOptions: languageOptions as LanguageOption[] 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
