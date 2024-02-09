import LoginPage from './components/pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import { useTranslation } from 'react-i18next';
import LanguageSwitch from './components/language-switch';

function App() {
  const { t } = useTranslation();

  return (
    <>
      <LoginPage />
      <LanguageSwitch />
      <h3>{t('description.part1')}</h3>
    </>
  );
}

export default App;
