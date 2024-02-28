import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../modules/language/i18n';
import NavigationBar from '../parts/NavigationBar';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

let component;

beforeEach(() => {
  component = render(
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>
      </AuthProvider>
    </I18nextProvider>
  );
});

test('Renders Navigation Bar', () => {
  const { getByTestId } = component;
  const navbarElement = getByTestId('NavigationBar');
  expect(navbarElement).toBeInTheDocument();
});

test('Rencders change language button', () => {
  const { getByTestId } = component;
  const burgerMenuButton = getByTestId('dropdown-menu-button');

  fireEvent.click(burgerMenuButton);
  const languageMenuItem = getByTestId('language-switch-button');

  expect(languageMenuItem).toBeInTheDocument();
});

test('Change language button is working', () => {
  const { getByTestId, queryByText } = component;
  const burgerMenuButton = getByTestId('dropdown-menu-button');

  fireEvent.click(burgerMenuButton);
  const languageMenuItem = getByTestId('language-switch-button');

  expect(queryByText('Pakeisti kalbą')).toBeInTheDocument();

  fireEvent.click(languageMenuItem);

  expect(queryByText('Change Language')).toBeInTheDocument();
});
