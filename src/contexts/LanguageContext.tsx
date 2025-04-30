
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
    try {
      if (!section || !key) return key || '';
      
      // Split by dots to access nested properties
      const sectionParts = section.split('.');
      let translationSection: any = translations;
      
      // Navigate through the sections
      for (const part of sectionParts) {
        if (!translationSection[part]) {
          return key;
        }
        translationSection = translationSection[part];
      }
      
      // Access the key in the final section
      if (translationSection[key] && translationSection[key][language]) {
        return translationSection[key][language];
      }
      
      return key;
    } catch (error) {
      console.error(`Translation error for ${section}.${key}:`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      languageOptions: languageOptions as LanguageOption[] 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
