import LoginPage from './components/pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './index.scss';
import NavigationBar from './components/Navbar/NavigationBar.jsx';
import Layout from './components/Layout/Layout.jsx';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <NavigationBar />
        <Layout />
      </I18nextProvider>
      <ForgotPasswordPage />
    </>
  );
}

export default App;
