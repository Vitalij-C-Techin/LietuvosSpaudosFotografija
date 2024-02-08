import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './index.scss';
import NavigationBar from './components/Navbar/NavigationBar.jsx';
import Layout from './components/Layout/Layout.jsx';

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <NavigationBar />
        <Layout />
      </I18nextProvider>
    </>
  );
}

export default App;
