
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from './translations';

// Convert our existing translations to i18next format
const resources = {
  pt: {
    translation: {}
  },
  en: {
    translation: {}
  },
  fr: {
    translation: {}
  },
  es: {
    translation: {}
  }
};

// Process our existing translations into flat format that i18next expects
Object.entries(translations).forEach(([section, sectionData]) => {
  Object.entries(sectionData).forEach(([key, keyData]) => {
    if (typeof keyData === 'object') {
      Object.entries(keyData).forEach(([subkey, subkeyData]) => {
        if (typeof subkeyData === 'object') {
          Object.entries(subkeyData).forEach(([lang, text]) => {
            if (!resources[lang as keyof typeof resources]) return;
            resources[lang as keyof typeof resources].translation[`${section}.${key}.${subkey}`] = text;
          });
        } else {
          Object.entries(subkeyData as any).forEach(([lang, text]) => {
            if (!resources[lang as keyof typeof resources]) return;
            resources[lang as keyof typeof resources].translation[`${section}.${key}`] = text;
          });
        }
      });
    }
  });
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
