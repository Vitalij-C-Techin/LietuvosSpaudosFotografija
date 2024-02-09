import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import NavigationBar from '../parts/NavigationBar';

test('renders NavigationBar', () => {
  const { getByTestId } = render(
    <I18nextProvider i18n={i18n}>
      <NavigationBar />
    </I18nextProvider>
  );
  const navbarElement = getByTestId('NavigationBar');
  expect(navbarElement).toBeInTheDocument();
});

test('renders change language NavigationBar dropdown menu item', () => {
  const { getByTestId } = render(
    <I18nextProvider i18n={i18n}>
      <NavigationBar />
    </I18nextProvider>
  );
  const burgerMenuButton = getByTestId('dropdown-menu-button');
  fireEvent.click(burgerMenuButton);
  const languageMenuItem = getByTestId('change-language-menu-item');
  expect(languageMenuItem).toBeInTheDocument();
});

test('renders with correct translation then switched', () => {
  const { getByText, getByTestId, queryAllByTestId } = render(
    <I18nextProvider i18n={i18n}>
      <NavigationBar />
    </I18nextProvider>
  );

  const burgerMenuButton = getByTestId('dropdown-menu-button');
  fireEvent.click(burgerMenuButton);

  expect(getByText('Home')).toBeInTheDocument();
  const languageMenuItem = getByTestId('change-language-menu-item');
  fireEvent.mouseEnter(languageMenuItem);

  const languageSwitchButtons = queryAllByTestId('language-switch-button');
  expect(getByText('English')).toBeInTheDocument();
  expect(getByText('Lithuanian')).toBeInTheDocument();
  fireEvent.click(languageSwitchButtons[1]);
  expect(getByText('Pradžia')).toBeInTheDocument();
  fireEvent.click(languageSwitchButtons[0]);
  expect(getByText('Home')).toBeInTheDocument();
});
