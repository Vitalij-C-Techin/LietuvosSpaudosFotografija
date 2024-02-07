import { useTranslation } from 'react-i18next';
import LanguageSwitch from './components/language-switch';
import './i18n.jsx';
import './index.scss';

function App() {
  const { t } = useTranslation();

  return (
    <>
      <LanguageSwitch />
      <h3>{t('description.part1')}</h3>
    </>
  );
}

export default App;
