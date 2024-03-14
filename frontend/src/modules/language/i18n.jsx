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
            dataSaveError: 'Problem while saving data. Please try again.',
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
            editProfile: 'Edit Profile'
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
            mediaNamePattern:
              'Media name must not start or end with a space, be empty, or be only spaces.',
            activity: 'State of work',
            work1: 'Freelancer',
            work2: 'Media worker'
          },
          adminCompetitionPage: {
            title: 'Competition management',
            viewParticipantRequest: 'View participant request',
            createCompetition: 'Create competition',
            competitionDates: 'Date',
            competitionView: 'View'
          },
          adminUserParticipationRequestPage: {
            title: 'Participation requests',
            participator: 'Participator',
            competition: 'Competition'
          },
          adminManageUsersPage: {
            title: 'User management',
            addUser: 'Create user',
            role: 'Role',
            chooseRole: 'Please chose the role',
            admin: 'Administrator',
            moderator: 'Moderator',
            user: 'User',
            jury: 'Jury',
            button: 'REGISTER'
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
            participate: 'Participate',
            registrationSuccess: 'Registration successful',
            continue: 'Continue'
          },
          editcomp: {
            valid: 'Please fill out the form before saving.',
            message: 'Are you sure you want to save?',
            error1: 'An error occurred while saving the competition. Please try again later.',
            dateAllert: 'End date cannot be less than start date.',
            allowedTypes: 'Photo allowed only in JPEG, JPG, PNG. format',
            headerCreate: 'Create Competition',
            headerView: 'View/Edit competition',
            Save: 'Save competition',
            cancel: 'Cancel',
            delete: 'Delete competition',
            compPicButton: 'Add photo',
            name: 'Title - EN',
            name2: 'Title - LT',
            description: 'Description - EN',
            description2: 'Description - LT',
            Plimit: 'Photo limit',
            status: 'Status',
            coming: 'coming',
            evaluates: 'evaluates',
            going: 'going',
            finished: 'finished',
            visible: 'Visible',
            public: 'public',
            private: 'private',
            Sdate: 'Start date',
            Edate: 'End date',
            Addcategory: 'Added categories',
            limitError: 'Photo limit must be between 1 and 50'
          },
          modalCancel: {
            ask1: 'Are you sure you want to cancel Competition Creation?',
            ask2: 'All unsave progress will be lost!',
            ask3: 'Are you sure you want to delete this competition?',
            ask4: 'All progress will be lost',
            confirm: 'Yes',
            closeButton: 'No'
          },
          modalCreate: {
            confirmSaveTitle: 'Are you sure you want to save?',
            confirm: 'Yes',
            cancel: 'No'
          },
          modalCategory: {
            titleCat: 'Title',
            titleAdd: 'Add category',
            titleEdit: 'Edit',
            closeButton: 'Close',
            type: 'Type',
            single: 'Single',
            series: 'Series',
            photoLimit: 'Photo limit'
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
            dropDownMenuItem10: 'Keisti kalbą',
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
            dataSaveError: 'Iškilo problema saugant duomenis. Bandykite dar kartą.',
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
            editProfile: 'Redaguoti profilį'
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
            mediaNamePattern:
              'Žiniasklaidos pavadinimas negali prasidėti arba baigtis tarpais, būti tuščias arba būti tik iš tarpų.',
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
          adminManageUsersPage: {
            title: 'Naudotojo valdymas',
            addUser: 'Sukurti naudotoją',
            role: 'Rolė',
            chooseRole: 'Prašome pasirinkti rolę',
            admin: 'Administratorius',
            moderator: 'Moderatorius',
            user: 'Naudotojas',
            jury: 'Vertintojas',
            button: 'REGISTRUOTI'
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
            participate: 'Dalyvauti',
            registrationSuccess: 'Registracija sėkminga',
            continue: 'Tęsti'
          },
          editcomp: {
            valid: 'Užpildikyte forma prieš išsaugant',
            message: 'Ar tikrai norite išsaugoti?',
            error1: 'Ivyko klaida išsaugant. Prašome bandyti veliau.',
            dateAllert: 'Pabaigos data negali buti ankstesne negu pradžios data.',
            alloweTypes: 'Galima tik JPEG, JPG, PNG formato fotografija',
            headerCreate: 'Sukurti konkursą',
            headerView: 'Peržiūrėti/Redaguoti konkursą',
            Save: 'Išsaugoti',
            cancel: 'Atšaukti',
            delete: 'Ištrinti konkursą',
            compPicButton: 'Pridėti nuotrauką',
            name: 'Pavadinimas - EN',
            name2: 'Pavadinimas - LT',
            description: 'Apie - EN',
            description2: 'Apie - LT',
            Plimit: 'Nuotraukų kiekis',
            status: 'Būsena',
            coming: 'Dar neprasidejo',
            evaluates: 'Vertinama',
            going: 'Vyksta',
            finished: 'Pasibaige',
            visible: 'Matomumas',
            public: 'matomas',
            private: 'nematomas',
            Sdate: 'Pradžia',
            Edate: 'Pabaiga',
            Addcategory: 'Pridėtos kategorijos',
            limitError: 'Foto turi buti nuo 1 iki 50'
          },
          modalCancel: {
            ask1: 'Ar tikrai norite nutraikti konkurso kurima?',
            ask2: 'Visas neišsaugotas progressas bus pamestas!',
            ask3: 'Ar jus tikrai norite ištrinti šita konkursą?',
            ask4: 'Visas progressas bus pamestas',
            confirm: 'Taip',
            closeButton: 'Ne'
          },
          modalCreate: {
            confirmSaveTitle: 'Ar tikrai norite išsaugoti duomenis?',
            confirm: 'Taip',
            cancel: 'Ne'
          },
          modalCategory: {
            titleCat: 'Pavadinimas',
            titleAdd: 'Pridėti kategoriją',
            titleEdit: 'Redaguoti',
            closeButton: 'Uždaryti',
            type: 'Tipas',
            single: 'Viena nuotrauka',
            series: 'Nuotraukų serija',
            photoLimit: 'Nuotraukų kiekis'
          }
        }
      }
    }
  });

export default i18n;
