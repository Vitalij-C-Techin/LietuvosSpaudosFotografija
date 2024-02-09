import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // TODO disable debug before production!
    debug: false,
    lng: 'en',
    returnObjects: true,
    resources: {
      en: {
        translation: {
          landingPage: {
            dropDownMenuItem1: 'Home',
            dropDownMenuItem2: 'Login/Register',
            dropDownMenuItem3: 'Profile',
            dropDownMenuItem4: 'Competition list(user)',
            dropDownMenuItem5: 'Competition list for evaluation(jury)',
            dropDownMenuItem6: 'Manage users(admin)',
            dropDownMenuItem7: 'Manage competitions(admin)',
            dropDownMenuItem8: 'Manage categories(admin)',
            dropDownMenuItem9: 'Support',
            dropDownMenuItem10: 'Change Language'
          },
          layoutPage: {
            imageHeaderText: 'Recent years contest winners'
          }
        }
      },
      lt: {
        translation: {
          landingPage: {
            dropDownMenuItem1: 'Pradžia',
            dropDownMenuItem2: 'Prisijungti, Registruotis',
            dropDownMenuItem3: 'Profilis',
            dropDownMenuItem4: 'Konkursų sąrašas(vartotojas)',
            dropDownMenuItem5: 'Konkursų sąrašas vertinimui (žiuri)',
            dropDownMenuItem6: 'Tvarkyti naudotojus (administratorius)',
            dropDownMenuItem7: 'Tvarkyti konkursus (administratorius)',
            dropDownMenuItem8: 'Tvarkyti kategorijas (administratorius)',
            dropDownMenuItem9: 'Pagalba',
            dropDownMenuItem10: 'Keisti kalba'
          },
          layoutPage: {
            imageHeaderText: 'Praeitu metu konkursu nugaletojai'
          }
        }
      }
    }
  });

export default i18n;
