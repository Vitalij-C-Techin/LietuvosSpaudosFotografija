import LoginPage from './components/pages/LoginPage';
import { I18nextProvider } from 'react-i18next';
import i18n from './modules/language/i18n.jsx';
import './index.scss';
import HomePage from './components/pages/HomePage';
import NavigationBar from './components/parts/NavigationBar.jsx';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <NavigationBar />
        <HomePage />
      </I18nextProvider>
      <ForgotPasswordPage />
    </>
  );
}

export default App;
