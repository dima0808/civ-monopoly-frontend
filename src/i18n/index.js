import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './language/en.js';
import { ua } from './language/ua.js';
import { LANGUAGES } from '../constants/lang.js';

const resources = {
  en: {
    translation: en,
  },
  ua: {
    translation: ua,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: LANGUAGES[0],

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
