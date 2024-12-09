import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import esLang from './es.json';
import enLang from './en.json';
import { i18nextPlugin } from 'translation-check';

const detectionOptions = {
  order: ['navigator', 'htmlTag'],
  lookupLocalStorage: '',
  supportedLngs: ['de', 'en', 'fr'],
};

const resources = {
  en: {
    translation: enLang,
  },
  es: {
    translation: esLang,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(i18nextPlugin)
  .init({
    detection: detectionOptions,
    resources,
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
