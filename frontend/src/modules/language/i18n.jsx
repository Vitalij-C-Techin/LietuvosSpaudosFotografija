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
            emailResetMessage: 'If the user exists in our database, an email link will be sent.',
            emailSendingError: 'Error sending password recovery email',
            required: 'This field is required.',
            resetPassword: 'RESET PASSWORD',
            serverErrorMessage: 'An error occurred. Please try again later.',
            formPlaceholderText: 'Enter your email here',
            recoverButton: 'SUBMIT'
          },
          passwordChangePage: {
            passwordChangeSuccessful: 'Password Changed Successfully',
            emailError: 'An error occurred. Please try again later.',
            title: 'Password change',
            newPassword: 'New password',
            newPasswordPlaceholder: 'new password',
            required: 'This field is required.',
            passwordMinLength: 'Password must be at least 8 characters long.',
            passwordMaxLength: 'Password must not exceed 60 characters.',
            passwordPattern:
              'Password must contain only lowercase, uppercase latin letters, numbers and special symbols !@#$%^&*().',
            confirmNewPassword: 'Confirm Password',
            confirmNewPasswordPlaceholder: 'confirm',
            passwordNotMatch:
              'The entered passwords do not match. Please make sure both passwords are identical.',
            button: 'Change Password'
          },
          registrationPage: {
            passwordNotMatch: 'Passwords do not match!',
            passwordMinLength: 'Password must be at least 8 characters long.',
            passwordMaxLength: 'Password must be less than 50 characters long.',
            passwordPattern:
              'Password must contain only lowercase, uppercase latin letters, numbers and special symbols !@#$%^&*().',
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
            phoneNumber: 'Phone number',
            activity: 'State of work',
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
            nameMinLength: 'Name must contain at least 2 characters.',
            nameMaxLength: 'Name must contain less than 50 characters.',
            namePattern: 'Name must contain only letters.',
            surnameMinLength: 'Surname must contain at least 2 characters.',
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
            createdAt: 'Created at',
            updateProfile: 'Update Profile'
          },
          userCompetitionPage: {
            title: 'My Competitions',
            competitionName: 'Competition',
            competitionCategories: 'Categories',
            participateCompetition: 'Participate in competition'
          },
          userDetailsUpdateForm: {
            title: 'Edit profile',
            userIsNotLoggedIn: 'User is not logged in',
            name: 'Name',
            surname: 'Surname',
            email: 'Email',
            birthYear: 'Birth year',
            phoneNumber: 'Phone number',
            phoneError: 'Invalid phone number.',
            media: 'Media',
            button: 'SAVE',
            namePlaceholder: 'Enter your name',
            surnamePlaceholder: 'Enter your surname',
            birthYearPlaceholder: 'e.g. 1990',
            phoneNumberPlaceholder: 'e.g. +37060000000',
            mediaPlaceholder: 'Enter media name',
            required: 'This field is required.',
            nameMinLength: 'Name must contain at least 2 characters.',
            nameMaxLength: 'Name must contain less than 50 characters.',
            namePattern: 'Name must contain only letters.',
            surnameMinLength: 'Surname must contain at least 2 characters.',
            surnameMaxLength: 'Surname must contain less than 50 characters.',
            surnamePattern: 'Surname must contain only letters.',
            successMessageSetData: 'User data updated successfully.',
            errorMessageSetData: 'Failed to update user data. Please try again later.',
            successMessageGetData: 'User data loaded successfully.',
            errorMessageGetData: 'Failed to load user data. Please try again later.',
            emailPattern: 'Email address does not mach the pattern.',
            birthYearMax: 'Only individuals who are born can register.',
            birthYearMin: 'Only persons younger than 120 years can register.',
            birthYearLength: 'Birth year must contain 4 digits.',
            mediaNameMaxLength: 'Must contain less than 50 characters.',
            mediaName: 'Name of media you represent',
            activity: 'State of work',
            work1: 'Freelancer',
            work2: 'Media worker'
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
            Acategory: 'Add category',
            message: 'Are you sure you want to save?',
            Save: 'Save'
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
            emailResetMessage:
              'Jei vartotojas egzistuoja mūsų duomenų bazėje, slaptažodžio atkūrimo nuoroda bus išsiųsta.',
            emailSendingError: 'Klaida siunčiant slaptažodžio atkūrimo el. laišką',
            resetPassword: 'ATKURTI SLAPTAŽODĮ',
            required: 'Šis laukas privalomas.',
            serverErrorMessage: 'Įvyko klaida. Prašome bandyti vėliau.',
            formPlaceholderText: 'Įveskite savo el. paštą čia',
            recoverButton: 'PATEIKTI'
          },
          passwordChangePage: {
            passwordChangeSuccessful: 'Slaptažodis pakeistas sėkmingai',
            emailError: 'Įvyko klaida. Prašome bandyti vėliau.',
            title: 'Slaptažodžio pakeitimas',
            newPassword: 'Naujas slaptažodis',
            newPasswordPlaceholder: 'naujas slaptažodis',
            required: 'Šis laukas privalomas.',
            passwordMinLength: 'Slaptažodis turi būti bent 8 simbolių ilgio.',
            passwordMaxLength: 'Slaptažodis negali viršyti 60 simbolių.',
            passwordPattern:
              'Slaptažodį turi sudaryti tik mažosios, didžiosios lotyniškos raidės, skaitmenys bei specialieji simboliai !@#$%^&*().',
            confirmNewPassword: 'Patvirtinti',
            confirmNewPasswordPlaceholder: 'patvirtinti',
            passwordNotMatch:
              'Įvesti slaptažodžiai nesutampa. Prašome įsitikinti, kad abu slaptažodžiai yra identiški.',
            button: 'Pakeisti slaptažodį'
          },
          registrationPage: {
            passwordNotMatch: 'Slaptažodžiai nesutampa!',
            passwordMinLength: 'Slaptažodis turi būti sudarytas bent iš 8 simbolių.',
            passwordMaxLength: 'Slaptažodis turi būti sudarytas iš mažiau nei 50 simbolių.',
            passwordPattern:
              'Slaptažodį turi sudaryti tik mažosios, didžiosios lotyniškos raidės, skaitmenys bei specialieji simboliai !@#$%^&*().',
            phoneError: 'Netinkamas telefono numeris.',
            registerSuccessful: 'Registracija sėkminga.',
            emailError: 'Toks el. paštas jau egzistuoja.',
            title: 'Naudotojo registracija',
            name: 'Vardas',
            surname: 'Pavardė',
            email: 'El. paštas',
            password: 'Slaptažodis',
            confirmPassword: 'Patvirtinti slaptažodį',
            birthYear: 'Gimimo metai',
            phoneNumber: 'Telefono numeris',
            activity: 'Veiklos sritis',
            work1: 'Laisvai samdomas',
            work2: 'Atstovaujama žiniasklaidos priemonė',
            mediaName: 'Žiniasklaidos priemonės pavadinimas',
            userAgreement: 'Vartotojo sutartis',
            button: 'REGISTRUOTIS',
            namePlaceholder: 'Įveskite savo vardą',
            surnamePlaceholder: 'Įveskite savo pavardę',
            passwordPlaceholder: 'Įveskite slaptažodį',
            cpasswordPlaceholder: 'Pakartokite slaptažodį',
            birthYearPlaceholder: 'pvz. 1990',
            required: 'Šis laukas privalomas.',
            nameMinLength: 'Vardą turi sudaryti bent 2 simboliai.',
            nameMaxLength: 'Vardą turi sudaryti mažiau nei 50 simbolių.',
            namePattern: 'Vardą turi sudaryti tik raidės.',
            surnameMinLength: 'Pavardę turi sudaryti bent 2 simboliai.',
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
            title: 'Prisijunkite prie savo paskyros',
            email: 'El.paštas',
            password: 'Slaptažodis',
            forgotPassword: 'Pamiršote slaptažodį?',
            login: 'PRISIJUNGTI',
            register: 'REGISTRUOTIS',
            loginFail: 'Prisijungti nepavyko',
            participate: 'DALYVAUTI',
            competitionEnd: 'Registracija baigiasi:',
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
            createdAt: 'Sukurta',
            updateProfile: 'Redaguoti profilį'
          },
          userCompetitionPage: {
            title: 'Mano konkursai',
            competitionName: 'Konkursas',
            competitionCategories: 'Kategorijos',
            participateCompetition: 'Dalyvauti konkurse'
          },
          userDetailsUpdateForm: {
            title: 'Redaguoti profilį',
            userIsNotLoggedIn: 'Esate neprisijungęs',
            name: 'Vardas',
            surname: 'Pavardė',
            email: 'El. paštas',
            birthYear: 'Gimimo metai',
            phoneNumber: 'Telefono numeris',
            phoneError: 'Netinkamas telefono numeris.',
            media: 'Žiniasklaida',
            button: 'IŠSAUGOTI',
            namePlaceholder: 'Įveskite savo vardą',
            surnamePlaceholder: 'Įveskite savo pavardę',
            birthYearPlaceholder: 'pvz. 1990',
            phoneNumberPlaceholder: 'pvz. +37060000000',
            mediaPlaceholder: 'Įveskite žiniasklaidos pavadinimą',
            required: 'Šis laukas privalomas.',
            nameMinLength: 'Vardą turi sudaryti bent 2 simboliai.',
            nameMaxLength: 'Vardą turi sudaryti mažiau nei 50 simbolių.',
            namePattern: 'Vardą turi sudaryti tik raidės.',
            surnameMinLength: 'Pavardę turi sudaryti bent 2 simboliai.',
            surnameMaxLength: 'Pavardę turi sudaryti mažiau nei 50 simbolių.',
            surnamePattern: 'Pavardę turi sudaryti tik raidės.',
            successMessageSetData: 'Vartotojo duomenys atnaujinti sėkmingai.',
            errorMessageSetData: 'Nepavyko atnaujinti vartotojo duomenų. Prašome bandyti vėliau.',
            successMessageGetData: 'Vartotojo duomenys įkelti sėkmingai.',
            errorMessageGetData: 'Nepavyko įkelti vartotojo duomenų. Prašome bandyti vėliau.',
            emailPattern: 'Elektroninio pašto adresas neatitinka formato.',
            birthYearMax: 'Gali registruotis tik gimusieji.',
            birthYearMin: 'Gali registruotis ne vyresni nei 120 metų asmenys.',
            birthYearLength: 'Gimimo metus turi sudaryti 4 skaitmenys.',
            mediaNameMaxLength: 'Turi sudaryti ne daugiau kaip 50 simbolių.',
            mediaName: 'Žiniasklaidos pavadinimas',
            activity: 'Veiklos sritis',
            work1: 'Laisvai samdomas',
            work2: 'Atstovaujama žiniasklaidos priemonė'
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
            Acategory: 'Prideti kategorija',
            message: 'Ar tikrai norite issaugoti?',
            Save: 'Issaugoti'
          }
        }
      }
    }
  });

export default i18n;
