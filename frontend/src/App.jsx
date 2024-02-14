import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import NavigationBar from './components/parts/NavigationBar.jsx';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import RegistrationPage from './components/pages/RegistrationPage.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from './modules/language/i18n.jsx';
import { Routes, Route } from 'react-router-dom';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavigationBar />
      <I18nextProvider i18n={i18n}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        </Routes>
      </I18nextProvider>
    </>
  );
}

export default App;
