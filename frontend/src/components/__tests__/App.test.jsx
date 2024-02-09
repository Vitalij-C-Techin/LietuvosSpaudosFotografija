import { render, fireEvent, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import App from '../../App';

test('Check if app works', () => {
  const x = 1;
});

test('renders language switch component', () => {
  const { getByTestId } = render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
  expect(getByTestId('language-switch')).toBeInTheDocument();
});

test('renders with correct translation then switched', () => {
  const { getByText, getAllByTestId } = render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );

  expect(getByText('Hello world!')).toBeInTheDocument();

  const languageSwitchButtons = getAllByTestId('language-switch-button');
  fireEvent.click(languageSwitchButtons[1]);
  expect(getByText('Sveikas pasauli!')).toBeInTheDocument();
  fireEvent.click(languageSwitchButtons[0]);
  expect(getByText('Hello world!')).toBeInTheDocument();
});
