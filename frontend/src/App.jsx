import { I18nextProvider } from 'react-i18next';
import i18n from './modules/language/i18n.jsx';

import { AuthProvider } from './components/context/AuthContext.jsx';

import { Route, Routes } from 'react-router-dom';

import NavigationBar from './components/parts/NavigationBar.jsx';
import HomePage from './components/pages/HomePage';
import RegistrationPage from './components/pages/RegistrationPage.jsx';
import LoginPage from './components/pages/LoginPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ProfilePage from './components/pages/ProfilePage.jsx';
import UserCompetitionsListPage from './components/pages/UserCompetitionsListPage.jsx';
import UserCompetitionsRequestPage from './components/pages/UserCompetitionsRequestPage.jsx';
import AdminCompetitionsListPage from './components/pages/adminPages/AdminCompetitionListPage.jsx';
import AdminUserParticipationRequestPage from './components/pages/adminPages/AdminUserParticipationRequestPage.jsx';
import ErrorPage from './components/pages/ErrorPage.jsx';
import PasswordChangePage from './components/pages/PasswordChangePage.jsx';
import CompetitionManagementPage from './components/pages/adminPages/CompetitionManagementPage.jsx';

import { Authorization, IsLogged, IsNotLogged } from './components/utils/Authorization.jsx';
import UserDetailsUpdatePage from './components/pages/UserDetailsUpdatePage.jsx';
import AdminManageUsersPage from './components/pages/adminPages/AdminManageUsersPage.jsx';
import AdminCreateUserPage from './components/pages/adminPages/AdminCreateUserPage.jsx';
import CreateCompetition from './components/pages/adminPages/CreateCompetitionPage.jsx';
import CompetitionPage from './components/pages/CompetitionPage.jsx';
import AdminManageUsersProfilePage from './components/pages/adminPages/AdminMangeUsersProfilePage.jsx';
import JuryCompetitionsListPage from './components/pages/JuryCompetitionsListPage.jsx';
import JuryCompetitionPage from './components/pages/JuryCompetitionPage.jsx';
import UserCompetitionPage from './components/pages/UserCompetitionPage.jsx';
import UserCategoryPage from './components/pages/UserCategoryPage.jsx';

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route element={<IsNotLogged />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/change-password" element={<PasswordChangePage />} />
            </Route>

            <Route element={<IsLogged />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<UserDetailsUpdatePage />} />
            </Route>

            <Route element={<Authorization allowedRoles={['MODERATOR', 'ADMIN']} />}>
              <Route path="/profile/:uuid" element={<AdminManageUsersProfilePage />} />
            </Route>

            <Route element={<Authorization allowedRoles={['USER', 'MODERATOR', 'ADMIN']} />}>
              <Route path="/user-competition-request" element={<UserCompetitionsRequestPage />} />
              <Route path="/user-competition-list" element={<UserCompetitionsListPage />} />
              <Route path="/user-competition/:uuid" element={<UserCompetitionPage />} />
              <Route path="/user-category/:uuid" element={<UserCategoryPage />} />
            </Route>

            <Route element={<Authorization allowedRoles={['JURY']} />}>
              <Route path="/jury-competition-list" element={<JuryCompetitionsListPage />} />
              <Route path="/jury-competition/:uuid" element={<JuryCompetitionPage />} />
              <Route
                path="/jury-competition/:comp_uuid/category/:category_uuid"
                element={<CompetitionPage />}
              />
            </Route>

            <Route element={<Authorization allowedRoles={['ADMIN', 'MODERATOR']} />}>
              <Route path="/admin-competitions-list" element={<AdminCompetitionsListPage />} />
              <Route path="/admin-competition-edit/:uuid" element={<CompetitionManagementPage />} />
              <Route
                path="/admin-user-participation-requests"
                element={<AdminUserParticipationRequestPage />}
              />
            </Route>

            <Route element={<Authorization allowedRoles={['ADMIN']} />}>
              <Route path="/create-competition" element={<CreateCompetition />} />
              <Route path="/admin-manage-users" element={<AdminManageUsersPage />} />
              <Route path="/admin-create-user" element={<AdminCreateUserPage />} />
            </Route>

            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </AuthProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
