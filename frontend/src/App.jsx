import { useTranslation } from 'react-i18next';
import LanguageSwitch from './components/language-switch';
import './i18n.jsx';
import './index.scss';
import NavigationBar from './components/Navbar/NavigationBar.jsx';

function App() {
  const { t } = useTranslation();

  return (
    <>
      <NavigationBar />
    </>
  );
}

export default App;
