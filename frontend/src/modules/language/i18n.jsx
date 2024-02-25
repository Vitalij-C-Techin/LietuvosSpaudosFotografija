import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
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
                        passwordPattern: 'Password must contain lowercase, uppercase letters, and numbers.',
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
                        nameMinLength: 'Name must contain at least 3 characters.',
                        nameMaxLength: 'Name must contain less than 50 characters.',
                        namePattern: 'Name must contain only letters.',
                        surnameMinLength: 'Surname must contain at least 3 characters.',
                        surnameMaxLength: 'Surname must contain less than 50 characters.',
                        surnamePattern: 'Surname must contain only letters.',
                        emailPattern: 'Email address does not mach the pattern.',
                        birthYearMax: 'Only persons older than 18 years can register.',
                        birthYearMin: 'Only persons younger than 100 years can register.',
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
                        passwordNotMatch: 'Slaptažodžiai nesutampa!',
                        passwordMinLength: 'Slaptažodis turi būti sudarytas bent iš 8 simbolių.',
                        passwordMaxLength: 'Slaptažodis turi būti sudarytas iš mažiau nei 50 simbolių.',
                        passwordPattern: 'Slaptažodį turi sudaryti mažosios, didžiosios raidės ir skaičiai.',
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
                        birthYearMin: 'Gali registruotis ne viresni nei 100 metų asmenys.',
                        mediaNameMaxLength: 'Turi sudaryti ne daugiau kaip 50 simbolių.'
                    },
                    loginPage: {
                        noUser: 'Tokio naudotojo nera',
                        invalidCredentials: 'Netaisingas el.paštas arba slaptažodis',
                        title: 'Prisijunkite prie savo paskyros',
                        email: 'El.paštas',
                        password: 'Slaptažodis',
                        forgotPassword: 'Pamiršote slaptažodi?',
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
