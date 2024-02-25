import { I18nextProvider } from 'react-i18next';
import i18n from './modules/language/i18n.jsx';

import { AuthProvider } from './components/context/AuthContext.jsx';

import { Routes, Route } from 'react-router-dom';

import NavigationBar from './components/parts/NavigationBar.jsx';
import HomePage from './components/pages/HomePage';
import RegistrationPage from './components/pages/RegistrationPage.jsx';
import LoginPage from './components/pages/LoginPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ProfilePage from './components/pages/ProfilePage.jsx';
import AdminCompetitionsListPage from './components/pages/AdminCompetitionsListPage.jsx';
import ErrorPage from './components/pages/ErrorPage.jsx';

import { Authorization } from './components/utils/Authorization.jsx';

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />

            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/admin-competitions-list" element={<AdminCompetitionsListPage />} />

            <Route element={<Authorization allowedRoles={['MODERATOR', 'ADMIN']} />}>
              <Route path="/p" element={<ProfilePage />} />
            </Route>

            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </AuthProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
