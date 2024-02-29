import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


const savedLanguage = localStorage.getItem('i18nextLng');
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
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
            passwordNotMatch: 'Passwords do not match!',
            passwordMinLength: 'Password must be at least 8 characters long.',
            passwordMaxLength: 'Password must be less than 50 characters long.',
            passwordPattern: 'Password must contain only lowercase, uppercase latin letters, numbers and special symbols !@#$%^&*().',
            phoneError: 'Invalid phone number.',
            registerSuccessful: 'Registration successful.',
            passwordNotMatch: 'Passwords do not match!',
            passwordMinLength: 'Password must be at least 8 characters long.',
            passwordMaxLength: 'Password must be less than 50 characters long.',
            passwordPattern: 'Password must contain only lowercase, uppercase latin letters, numbers and special symbols !@#$%^&*().',
            phoneError: 'Invalid phone number.',
            registerSuccessful: 'Registration successful.',
            emailError: 'Email already exists.',
            title: 'User Registration',
            name: 'Name',
            surname: 'Surname',
            email: 'Email',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            birthYear: 'Birth year',
            birthYear: 'Birth year',
            phoneNumber: 'Phone number',
            activity: 'State of work',
            work1: 'Freelancer',
            work2: 'Media worker',
            mediaName: 'Name of media you represent',
            userAgreement: 'User agreement',
            work1: 'Freelancer',
            work2: 'Media worker',
            mediaName: 'Name of media you represent',
            userAgreement: 'User agreement',
            button: 'REGISTER',
            namePlaceholder: 'Enter your name',
            surnamePlaceholder: 'Enter your surname',
            passwordPlaceholder: 'Enter password',
            cpasswordPlaceholder: 'Confirm password',
            birthYearPlaceholder: 'e.g. 1990',
            required: 'This field is required.',
            nameMinLength: 'Name must contain at least 3 characters.',
            nameMaxLength: 'Name must contain less than 50 characters.',
            namePattern: 'Name must contain only letters.',
            surnameMinLength: 'Surname must contain at least 3 characters.',
            surnameMaxLength: 'Surname must contain less than 50 characters.',
            surnamePattern: 'Surname must contain only letters.',
            emailPattern: 'Email address does not mach the pattern.',
            birthYearMax: 'Only persons older than 18 years can register.',
            birthYearMin: 'Only persons younger than 120 years can register.',
            birthYearLength: 'Birth year must contain 4 digits.',
            mediaNameMaxLength: 'Must contain less than 50 characters.',
            birthYearPlaceholder: 'e.g. 1990',
            required: 'This field is required.',
            nameMinLength: 'Name must contain at least 3 characters.',
            nameMaxLength: 'Name must contain less than 50 characters.',
            namePattern: 'Name must contain only letters.',
            surnameMinLength: 'Surname must contain at least 3 characters.',
            surnameMaxLength: 'Surname must contain less than 50 characters.',
            surnamePattern: 'Surname must contain only letters.',
            emailPattern: 'Email address does not mach the pattern.',
            birthYearMax: 'Only persons older than 18 years can register.',
            birthYearMin: 'Only persons younger than 120 years can register.',
            birthYearLength: 'Birth year must contain 4 digits.',
            mediaNameMaxLength: 'Must contain less than 50 characters.'
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
            competitionTitle: 'COMPETITION TITLE',
            required: 'This field is required.',
            passwordPlaceholder: 'Enter password',
            competitionTitle: 'COMPETITION TITLE',
            required: 'This field is required.',
            passwordPlaceholder: 'Enter password'
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
          userCompetitionPage: {
            title: 'My Competitions',
            competitionName: 'Competition',
            competitionCategories: 'Categories',
            participateCompetition: 'Participate in competition'
          },
          adminCompetitionPage: {
            title: 'Competition management',
            viewParticipantRequest: 'View participant request',
            createCompetition: 'Create competition',
            competitionDates: 'Dates',
            competitionView: 'View'
          },
          adminUserParticipationRequestPage: {
            title: 'Participation requests',
            participator: 'Participator',
            competition: 'Competition'
          },
          notificationMessages: {
            loading: 'Loading',
            empty: 'Empty'
          },
          modal: {
            competitionAbout: 'About competition',
            competitionTitle: 'Title',
            competitionDescription: 'Description',
            competitionDates: 'Registration is ongoing',
            competitionCategories: 'Categories',
            participate: 'Participate'
          },
          editcomp: {
            header: 'View/Edit competition',
            delete: 'Delete competition',
            name: 'Name',
            description: 'Description',
            Sdate: 'Start date',
            Plimit: 'Photo limit',
            Status: 'Status',
            solo: 'Solo',
            number: 'Number',
            group: 'Group',
            active: 'Active',
            closed: 'Closed',
            visible: 'Visible',
            Edate: 'End date',
            active2: 'Visible',
            closed2: 'Hidden',
            Addcategory: 'Added categories',
            Ccategory: 'Create category',
            status: 'Status',
            Acategory:'Add category',
            message: "Are you sure you want to save?",
            Save: "Save"
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
            passwordNotMatch: 'Slaptažodžiai nesutampa!',
            passwordMinLength: 'Slaptažodis turi būti sudarytas bent iš 8 simbolių.',
            passwordMaxLength: 'Slaptažodis turi būti sudarytas iš mažiau nei 50 simbolių.',
            passwordPattern: 'Slaptažodį turi sudaryti tik mažosios, didžiosios lotyniškos raidės, skaitmenys bei specialieji simboliai !@#$%^&*().',
            passwordNotMatch: 'Slaptažodžiai nesutampa!',
            passwordMinLength: 'Slaptažodis turi būti sudarytas bent iš 8 simbolių.',
            passwordMaxLength: 'Slaptažodis turi būti sudarytas iš mažiau nei 50 simbolių.',
            passwordPattern: 'Slaptažodį turi sudaryti tik mažosios, didžiosios lotyniškos raidės, skaitmenys bei specialieji simboliai !@#$%^&*().',
            phoneError: 'Netinkamas telefono numeris.',
            registerSuccessful: 'Registracija sėkminga.',
            registerSuccessful: 'Registracija sėkminga.',
            emailError: 'Toks el. paštas jau egzistuoja.',
            title: 'Naudotojo registracija',
            name: 'Vardas',
            surname: 'Pavardė',
            email: 'El. paštas',
            password: 'Slaptažodis',
            confirmPassword: 'Patvirtinti slaptažodį',
            birthYear: 'Gimimo metai',
            birthYear: 'Gimimo metai',
            phoneNumber: 'Telefono numeris',
            activity: 'Veiklos sritis',
            work1: 'Laisvai samdomas',
            work2: 'Atsotvaujama žiniasklaidos priemonė',
            mediaName: 'Žiniasklaidos priemonės pavadinimas',
            userAgreement: 'Vartotojo sutartis',
            work1: 'Laisvai samdomas',
            work2: 'Atsotvaujama žiniasklaidos priemonė',
            mediaName: 'Žiniasklaidos priemonės pavadinimas',
            userAgreement: 'Vartotojo sutartis',
            button: 'REGISTRUOTIS',
            namePlaceholder: 'Įveskite savo vardą',
            surnamePlaceholder: 'Įveskite savo pavardę',
            passwordPlaceholder: 'Įveskite slaptažodį',
            cpasswordPlaceholder: 'Pakartokite slaptažodį',
            birthYearPlaceholder: 'pvz. 1990',
            required: 'Šis laukas privalomas.',
            nameMinLength: 'Vardą turi sudaryti bent 3 simboliai.',
            nameMaxLength: 'Vardą turi sudaryti mažiau nei 50 simbolių.',
            namePattern: 'Vardą turi sudaryti tik raidės.',
            surnameMinLength: 'Pavardę turi sudaryti bent 3 simboliai.',
            surnameMaxLength: 'Pavardę turi sudaryti mažiau nei 50 simbolių.',
            surnamePattern: 'Pavardę turi sudaryti tik raidės.',
            emailPattern: 'Elektroninio pašto adresas neatitinka formato.',
            birthYearMax: 'Gali registruotis ne jaunesni nei 18 metų asmenys.',
            birthYearMin: 'Gali registruotis ne vyresni nei 120 metų asmenys.',
            birthYearLength: 'Gimimo metus turi sudaryti 4 skaitmenys.',
            mediaNameMaxLength: 'Turi sudaryti ne daugiau kaip 50 simbolių.',
            surnamePlaceholder: 'Įveskite savo pavardę',
            passwordPlaceholder: 'Įveskite slaptažodį',
            cpasswordPlaceholder: 'Pakartokite slaptažodį',
            birthYearPlaceholder: 'pvz. 1990',
            required: 'Šis laukas privalomas.',
            nameMinLength: 'Vardą turi sudaryti bent 3 simboliai.',
            nameMaxLength: 'Vardą turi sudaryti mažiau nei 50 simbolių.',
            namePattern: 'Vardą turi sudaryti tik raidės.',
            surnameMinLength: 'Pavardę turi sudaryti bent 3 simboliai.',
            surnameMaxLength: 'Pavardę turi sudaryti mažiau nei 50 simbolių.',
            surnamePattern: 'Pavardę turi sudaryti tik raidės.',
            emailPattern: 'Elektroninio pašto adresas neatitinka formato.',
            birthYearMax: 'Gali registruotis ne jaunesni nei 18 metų asmenys.',
            birthYearMin: 'Gali registruotis ne vyresni nei 120 metų asmenys.',
            birthYearLength: 'Gimimo metus turi sudaryti 4 skaitmenys.',
            mediaNameMaxLength: 'Turi sudaryti ne daugiau kaip 50 simbolių.'
          },
          loginPage: {
            noUser: 'Tokio naudotojo nėra',
            invalidCredentials: 'Neteisingas el.paštas arba slaptažodis',
            noUser: 'Tokio naudotojo nėra',
            invalidCredentials: 'Neteisingas el.paštas arba slaptažodis',
            title: 'Prisijunkite prie savo paskyros',
            email: 'El.paštas',
            password: 'Slaptažodis',
            forgotPassword: 'Pamiršote slaptažodį?',
            forgotPassword: 'Pamiršote slaptažodį?',
            login: 'PRISIJUNGTI',
            register: 'REGISTRUOTIS',
            loginFail: 'Prisijungti nepavyko',
            participate: 'DALYVAUTI',
            competitionEnd: 'Registracija baigiasi:',
            competitionTitle: 'KONKURSO PAVADINIMAS',
            required: 'Šis laukas privalomas.',
            passwordPlaceholder: 'Įveskite slaptažodį',
            competitionTitle: 'KONKURSO PAVADINIMAS',
            required: 'Šis laukas privalomas.',
            passwordPlaceholder: 'Įveskite slaptažodį'
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
          userCompetitionPage: {
            title: 'Mano konkursai',
            competitionName: 'Konkursas',
            competitionCategories: 'Kategorijos',
            participateCompetition: 'Dalyvauti konkurse'
          },
          adminCompetitionPage: {
            title: 'Konkursų valdymas',
            viewParticipantRequest: 'Peržiūrėti dalyvio užklausą',
            createCompetition: 'Sukurti konkursą',
            competitionDates: 'Datos',
            competitionView: 'Peržiūrėti'
          },
          adminUserParticipationRequestPage: {
            title: 'Dalyvavimo užklausos',
            participator: 'Dalyvis',
            competition: 'Konkursas'
          },
          notificationMessages: {
            loading: 'Vyksta duomenų įkėlimas',
            empty: 'Tuščia'
          },
          modal: {
            competitionAbout: 'Apie konkursą',
            competitionTitle: 'Pavadinimas',
            competitionDescription: 'Aprašymas',
            competitionDates: 'Registracija vyksta',
            competitionCategories: 'Kategorijos',
            participate: 'Dalyvauti'
          },
          editcomp: {
            header: 'Perziureti/Pakeisti rengyni',
            delete: 'Istrinti rengyni',
            name: 'Vardas',
            description: 'Apie',
            Sdate: 'Pradzios data',
            Plimit: 'Foto limitas',
            Status: 'Statusas',
            solo: 'Paviene',
            number: 'Kelios',
            group: 'Grupine',
            active: 'Vyksta',
            closed: 'Uzdarytas',
            visible: 'Matosi',
            Edate: 'Pabaigos data',
            active2: 'Matosi',
            closed2: 'Pasleptas',
            Addcategory: 'Pridetos kategorijos',
            Ccategory: 'Sukurti kategorija',
            status: 'Statusas',
            Acategory: "Prideti kategorija",
            message: 'Ar tikrai norite issaugoti?',
            Save: 'Issaugoti'
          }
        }
      }
    }
  });

export default i18n;
