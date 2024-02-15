import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../modules/language/i18n';
import NavigationBar from '../parts/NavigationBar';

let component;

beforeEach(() => {
  component = render(
    <I18nextProvider i18n={i18n}>
      <NavigationBar />
    </I18nextProvider>
  );
});

test('renders NavigationBar', () => {
  const { getByTestId } = component;
  const navbarElement = getByTestId('NavigationBar');
  expect(navbarElement).toBeInTheDocument();
});

test('displays nested dropdown menu on hover', () => {
  const { getByTestId, queryByText } = component;
  const burgerMenuButton = getByTestId('dropdown-menu-button');
  fireEvent.click(burgerMenuButton);
  const languageMenuItem = getByTestId('change-language-menu-item');
  fireEvent.mouseEnter(languageMenuItem);
  expect(queryByText('English')).toBeInTheDocument();
  expect(queryByText('Lithuanian')).toBeInTheDocument();
});

test('renders change language NavigationBar dropdown menu item', () => {
  const { getByTestId } = component;
  const burgerMenuButton = getByTestId('dropdown-menu-button');
  fireEvent.click(burgerMenuButton);
  const languageMenuItem = getByTestId('change-language-menu-item');
  expect(languageMenuItem).toBeInTheDocument();
});

test('renders with correct translation then switched', () => {
  const { getByText, getByTestId, queryAllByTestId } = component;

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
