import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
const savedLanguage = localStorage.getItem('i18nextLng');
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // TODO disable debug before production!
    debug: false,
    lng: savedLanguage || 'lt',
    fallbackLng: 'lt',
    returnObjects: true,
    resources: {
      en: {
        translation: {
          landingPage: {
            dropDownMenuItem1: 'Home',
            dropDownMenuItem2: 'Login',
            dropDownMenuItem3: 'Profile',
            dropDownMenuItem4: 'Competition list(user)',
            dropDownMenuItem5: 'Competition list for evaluation(jury)',
            dropDownMenuItem6: 'Manage users(admin)',
            dropDownMenuItem7: 'Manage competitions(admin)',
            dropDownMenuItem8: 'Manage categories(admin)',
            dropDownMenuItem9: 'Support',
            dropDownMenuItem10: 'Change Language',
            dropDownMenuItem11: 'Logout',
            dropDownMenuItem12: 'Register'
          },
          layoutPage: {
            imageHeaderText: 'WINNERS OF PREVIOUS COMPETITIONS'
          },
          homePage: {
            constestListTitle: 'COMPETITIONS OPEN FOR ENTRY'
          },
          emailVerification: {
            invalidEmailFormat: 'Invalid email format!'
          },
          forgotPasswordForm: {
            resetPassword: 'RESET PASSWORD',
            serverErrorMessage: 'An error occurred. Please try again later.',
            formPlaceholderText: 'Enter your email here',
            recoverButton: 'SUBMIT'
          },
          registrationPage: {
            passwordMatch: 'Passwords do not match!',
            passwordMinLength: 'Password must be at least 8 characters in length',
            passwordMaxLength: 'Password must be less than 50 characters in length',
            passwordPattern:
              'Password must contain at least one uppercase letter and at least one number',
            phoneError: 'Invalid phone number,',
            registerSuccessuful: 'Registration successufull,',
            emailError: 'Email already exists.',
            error: 'Fill form correctly',
            title: 'User Registration',
            name: 'Name',
            surname: 'Surname',
            email: 'Email',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            byear: 'Birth year',
            phoneNumber: 'Phone number',
            activity: 'State of work',
            work1: 'Freelancer',
            work2: 'Media worker',
            mediaName: 'Name of media you represent',
            Uagreement: 'User agreement',
            button: 'REGISTER',
            namePlaceholder: 'Enter your name',
            surnamePlaceholder: 'Enter your surname',
            passwordPlaceholder: 'Enter password',
            cpasswordPlaceholder: 'Confirm password',
            byearPlaceholder: 'e.g. 1990',
            required: 'Field is required',
            nameMinLegth: 'Name must contain at least 3 characters',
            nameMaxLegth: 'Name must contain less than 20 characters',
            namePattern: 'Name must contain only letters',
            surnameMinLegth: 'Surame must contain at least 3 characters',
            surnameMaxLegth: 'Surname must contain less than 20 characters',
            surnamePattern: 'Surname must contain only letters',
            emailPattern: 'Email address does not mach the pattern',
            birthYearMax: 'Can registrate only persons older than 18 years',
            birthYearMin: 'Can registrate only persons younger than 100 years',
            mediaNameMinLength: 'Must contain at least 2 characters',
            mediaNameMaxLength: 'Must contain less than 50 characters'
          },
          loginPage: {
            noUser: 'no such user',
            invalidCredentials: 'Invalid email or password',
            title: 'Log in to your account',
            email: 'Email',
            password: 'Password',
            forgotPassword: 'Forgot password?',
            login: 'LOGIN',
            register: 'REGISTER',
            loginFail: 'login failed',
            participate: 'PARTICIPATE',
            competitionEnd: 'Competition ends in:',
            competitionTitle: 'COMPETITION TITLE'
          },
          profile: {
            myProfile: 'Profile',
            userIsNotLoggedIn: 'User is not logged in',
            id: 'ID',
            name: 'Name',
            surname: 'Surname',
            email: 'Email',
            role: 'Role',
            birthYear: 'Birth year',
            phoneNumber: 'Phone number',
            media: 'Media',
            createdAt: 'Created at'
          },
          adminCompetitionPage: {
            title: 'Competition management',
            viewParticipantRequest: 'View participant request',
            createCompetition: 'Create competition',
            competitionDates: 'Dates',
            competitionView: 'View',
            loading: 'Loading',
            empty: 'Empty'
          }
        }
      },
      lt: {
        translation: {
          landingPage: {
            dropDownMenuItem1: 'Pradžia',
            dropDownMenuItem2: 'Prisijungti',
            dropDownMenuItem3: 'Profilis',
            dropDownMenuItem4: 'Konkursų sąrašas(vartotojas)',
            dropDownMenuItem5: 'Konkursų sąrašas vertinimui (žiuri)',
            dropDownMenuItem6: 'Tvarkyti naudotojus (administratorius)',
            dropDownMenuItem7: 'Tvarkyti konkursus (administratorius)',
            dropDownMenuItem8: 'Tvarkyti kategorijas (administratorius)',
            dropDownMenuItem9: 'Pagalba',
            dropDownMenuItem10: 'Keisti kalba',
            dropDownMenuItem11: 'Atsijungti',
            dropDownMenuItem12: 'Registruotis'
          },
          layoutPage: {
            imageHeaderText: 'PRAEITŲ KONKURSŲ NUGALĖTOJAI'
          },
          homePage: {
            constestListTitle: 'ŠIUO METU AKTYVUS KONKURSAI'
          },
          emailVerification: {
            invalidEmailFormat: 'Netinkamas el.pašto formatas'
          },
          forgotPasswordForm: {
            resetPassword: 'Atstatyti slaptažodį',
            serverErrorMessage: 'Įvyko klaida. Pabandykite dar kartą vėliau.',
            formPlaceholderText: 'Įveskite savo el. pašto adresą čia',
            recoverButton: 'TOLIAU'
          },
          registrationPage: {
            passwordMatch: 'Slaptažodžiai nesutampa!',
            passwordMinLength: 'Slaptažodis turi būti sudarytas bent iš 8 simbolių',
            passwordMaxLength: 'Slaptažodis turi būti sudarytas iš mažiau nei 50 simbolių',
            passwordPattern:
              'Slaptažodį turi sudaryti bent viena didžioji raidė ir bent vienas skaičius',
            phoneError: 'Netinkamas telefono numeris.',
            registerSuccessuful: 'Registracija sėkminga.',
            emailError: 'Toks el. paštas jau egzistuoja.',
            error: 'Užpildykite formą teisingai.',
            title: 'Naudotojo registracija',
            name: 'Vardas',
            surname: 'Pavardė',
            email: 'El. paštas',
            password: 'Slaptažodis',
            confirmPassword: 'Patvirtinti slaptažodį',
            byear: 'Gimimo metai',
            phoneNumber: 'Telefono numeris',
            activity: 'Veiklos sritis',
            work1: 'Laisvai samdomas',
            work2: 'Atsotvaujama žiniasklaidos priemonė',
            mediaName: 'Žiniasklaidos priemonės pavadinimas',
            Uagreement: 'Vartotojo sutartis',
            button: 'REGISTRUOTIS',
            namePlaceholder: 'Įveskite savo vardą',
            surnamePlaceholder: 'Įveskite savo pavarde',
            passwordPlaceholder: 'Įveskite slaptažodi',
            cpasswordPlaceholder: 'Pakartokite slaptažodi',
            byearPlaceholder: 'pvz. 1990',
            required: 'Laukas privalomas',
            nameMinLegth: 'Vardą turi sudaryti bent 3 simboliai',
            nameMaxLegth: 'Vardą turi sudaryti mažiau nei 50 simbolių',
            namePattern: 'Vardą turi sudryti tik raidės',
            surnameMinLegth: 'Pavardę turi sudaryti bent 3 simboliai',
            surnameMaxLegth: 'Pavardę turi sudaryti mažiau nei 50 simbolių',
            surnamePattern: 'Pavardę turi sudryti tik raidės',
            emailPattern: 'Elektroninio pašto adresas neatitinka formato',
            birthYearMax: 'Gali registruotis ne jaunesni negu 18 metų asmenys',
            birthYearMin: 'Gali registruotis ne viresni negu 100 metų asmenys',
            mediaNameMinLength: 'Turi sudaryti ne mažiau kaip 2 simboliai',
            mediaNameMaxLength: 'Turi sudaryti ne daugiau kaip 50 simbolių'
          },
          loginPage: {
            noUser: 'Tokio naudotojo nera',
            invalidCredentials: 'Netaisingas El.paštas arba slaptažodis',
            title: 'Prisijunkite prie savo paskyros',
            email: 'El.paštas',
            password: 'Slaptažodis',
            forgotPassword: 'Pamiršote slaptažodi?',
            login: 'PRISIJUNGTI',
            register: 'REGISTRUOTIS',
            loginFail: 'Prisijungti nepavyko',
            participate: 'DALYVAUTI',
            competitionEnd: 'Registracija baigiasi:',
            competitionTitle: 'KONKURSO PAVADINIMAS'
          },
          profile: {
            myProfile: 'Profilis',
            userIsNotLoggedIn: 'User is not logged in',
            id: 'ID',
            name: 'Vardas',
            surname: 'Pavardė',
            email: 'El. paštas',
            role: 'Rolė',
            birthYear: 'Gimimo metai',
            phoneNumber: 'Telefono numeris',
            media: 'Žiniasklaida',
            createdAt: 'Sukurta'
          },
          adminCompetitionPage: {
            title: 'Konkursų valdymas',
            viewParticipantRequest: 'Peržiūrėti dalyvio užklausą',
            createCompetition: 'Sukurti konkursą',
            competitionDates: 'Datos',
            competitionView: 'Peržiūrėti',
            loading: 'Vyksta duomenų įkėlimas',
            empty: 'Tuščia'
          }
        }
      }
    }
  });

export default i18n;
