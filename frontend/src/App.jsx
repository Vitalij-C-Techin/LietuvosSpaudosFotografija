import { useTranslation } from 'react-i18next';
import LanguageSwitch from './components/language-switch';
import './css/style.css';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';

function App() {
  const { t } = useTranslation();

  return (
    <>
      <LanguageSwitch />
      <h3>{t('description.part1')}</h3>
      <ForgotPasswordPage />
    </>
  );
}

export default App;
