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
            dropDownMenuItem10: 'Change Language',
            dropDownMenuItem11: 'Logout'
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
            password1: 'Passwords do not match!',
            password2: 'Password must be between {{min}} and {{max}} characters.',
            password3: 'Password must contain at least one uppercase letter.',
            password4: 'Password must contain at least one number.',
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
            work1: 'freelancer',
            work2: 'media worker',
            textArea: 'Who do you work for?',
            Uagreement: 'User agreement',
            button: 'REGISTER',
            namePlaceholder: 'Enter your name',
            surnamePlaceholder: 'Enter your surname',
            passwordPlaceholder: 'Enter password',
            cpasswordPlaceholder: 'Confirm password',
            byearPlaceholder: 'Date of birth (e.g. 1990)'
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
            participate: 'PARTICIPATE'
          },
          profile: {
            userIsNotLoggedIn: 'User is not logged in'
          }
        }
      },
      lt: {
        translation: {
          landingPage: {
            dropDownMenuItem1: 'Pradžia',
            dropDownMenuItem2: 'Prisijungti/ Registruotis',
            dropDownMenuItem3: 'Profilis',
            dropDownMenuItem4: 'Konkursų sąrašas(vartotojas)',
            dropDownMenuItem5: 'Konkursų sąrašas vertinimui (žiuri)',
            dropDownMenuItem6: 'Tvarkyti naudotojus (administratorius)',
            dropDownMenuItem7: 'Tvarkyti konkursus (administratorius)',
            dropDownMenuItem8: 'Tvarkyti kategorijas (administratorius)',
            dropDownMenuItem9: 'Pagalba',
            dropDownMenuItem10: 'Keisti kalba',
            dropDownMenuItem11: 'Atsijungti'
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
            password1: 'Slaptažodžiai nesutampa!',
            password2: 'Slaptažodis turi būti nuo {{min}} iki {{max}} simbolių.',
            password3: 'Slaptažodyje turi būti bent viena didžioji raidė.',
            password4: 'Slaptažodyje turi būti bent vienas skaičius.',
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
            work1: 'Savanoris',
            work2: 'Žiniasklaidos darbuotojas',
            textArea: 'Kokiai žiniasklaidai priklausote',
            Uagreement: 'Vartotojo sutartis',
            button: 'REGISTRUOTIS',
            namePlaceholder: 'Įveskite savo vardą',
            surnamePlaceholder: 'Įveskite savo pavarde',
            passwordPlaceholder: 'Įveskite slaptažodi',
            cpasswordPlaceholder: 'Pakartokite slaptažodi',
            byearPlaceholder: 'Gimimo metai(pvz. 1990)'
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
            participate: 'DALYVAUTI'
          },
          profile: {
            userIsNotLoggedIn: 'Vartotojas neprisijungęs'
          }
        }
      }
    }
  });

export default i18n;
