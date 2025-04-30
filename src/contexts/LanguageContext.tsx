
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, LanguageOption } from '@/types/language';
import { languageOptions, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (section: string, key: string) => string;
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
  const [language, setLanguage] = useState<Language>('pt');

  // Translation function
  const t = (section: string, key: string): string => {
    // @ts-ignore - This is a dynamic access to nested properties
    const translation = section.split('.').reduce((obj, path) => 
      obj && obj[path], translations)[key];
    
    return translation?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageOptions }}>
      {children}
    </LanguageContext.Provider>
  );
};
