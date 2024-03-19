import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginForm from '../parts/LoginForm';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../../modules/language/i18n';
import { I18nextProvider } from 'react-i18next';
import { t } from 'i18next';
import { AuthProvider } from '../context/AuthContext.jsx';

jest.mock('axios');
let component;
beforeEach(() => {
  component = render(
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </AuthProvider>
    </I18nextProvider>
  );
});

jest.mock('../context/AuthContext.jsx', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({
    login: jest.fn().mockImplementation((email, password, callbacks) => {
      if (email === 'validemail@mail.com' && password === 'ValidPassword123') {
        callbacks.then({});
      }
      if (email === 'invalidemail@mail.com' && password === 'InvalidPassword123') {
        callbacks.catch({ response: { status: 401 } });
      }
    })
  })
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

const mockedUsedNavigate = jest.fn();

afterEach(() => {
  mockedUsedNavigate.mockClear();
});

test('component renders successfully', async () => {
  const formTitle = screen.getByTestId('form-title');
  const emailFieldTitle = screen.getByTestId('email-input');
  const passwordFieldTitle = screen.getByTestId('password-input');
  const loginButton = screen.getByTestId('login-button');

  expect(formTitle).toBeInTheDocument();
  expect(emailFieldTitle).toBeInTheDocument();
  expect(passwordFieldTitle).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('displays error messages for empty required fields', async () => {
  fireEvent.click(screen.getByText(t('loginPage.login')));

  const errorMessages = await screen.findAllByText(t('loginPage.required'));

  expect(errorMessages.length).toBeGreaterThan(0);
  errorMessages.forEach((errorMessage) => {
    expect(errorMessage).toHaveClass('text-danger');
  });
});

test('if email and password correct redirect to profile', async () => {
  const emailInput = screen.getByPlaceholderText(/example@example.com/i);
  const passwordInput = screen.getByPlaceholderText(t('loginPage.passwordPlaceholder'));

  fireEvent.change(emailInput, { target: { value: 'validemail@mail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'ValidPassword123' } });

  fireEvent.click(screen.getByTestId('login-button'));

  await waitFor(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/profile');
  });
});

test('if credentials are wrong do not redirect to profile', async () => {
  const emailInput = screen.getByPlaceholderText(/example@example.com/i);
  const passwordInput = screen.getByPlaceholderText(t('loginPage.passwordPlaceholder'));

  fireEvent.change(emailInput, { target: { value: 'invalidemail@mail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'InvalidPassword123' } });

  fireEvent.click(screen.getByTestId('login-button'));

  await waitFor(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(0);
  });
});

test('displays error message for wrong credentials', async () => {
  const emailInput = screen.getByPlaceholderText(/example@example.com/i);
  const passwordInput = screen.getByPlaceholderText(t('loginPage.passwordPlaceholder'));

  fireEvent.change(emailInput, { target: { value: 'invalidemail@mail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'InvalidPassword123' } });

  await fireEvent.click(screen.getByTestId('login-button'));

  await waitFor(async () => {
    const errorMessage = await screen.findByText(t('loginPage.invalidCredentials'));
    expect(errorMessage).toBeInTheDocument();
  });
});
