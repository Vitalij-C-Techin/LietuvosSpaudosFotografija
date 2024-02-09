import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // TODO disable debug before production!
    debug: true,
    lng: 'en',
    returnObjects: true,
    resources: {
      en: {
        translation: {
          description: {
            part1: 'Hello world!'
          }
        }
      },
      lt: {
        translation: {
          description: {
            part1: 'Sveikas pasauli!'
          }
        }
      }
    }
  });

export default i18n;
