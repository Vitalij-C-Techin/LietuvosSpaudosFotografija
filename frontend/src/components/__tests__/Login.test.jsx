import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginForm from '../parts/LoginForm';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../modules/AuthContext';
import i18n from '../../modules/language/i18n';
import { I18nextProvider } from 'react-i18next';
//TODO check after updated login error messages
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

test('if email and password correct redirect to home', async () => {
  const emailInput = screen.getByPlaceholderText(/egzamle@egzample.com/i);
  const passwordInput = screen.getByPlaceholderText(/Enter password/i);

  fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'NewPassword123' } });

  fireEvent.click(screen.getByTestId('login'));

  await waitFor(() => {
    expect(window.location.pathname).toBe('/');
  });
});

test('displays error message for wrong credentials', async () => {
  const emailInput = screen.getByPlaceholderText(/egzamle@egzample.com/i);
  const passwordInput = screen.getByPlaceholderText(/Enter password/i);

  fireEvent.change(emailInput, { target: { value: 'invalidemail@mail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'InvalidPassword123' } });

  fireEvent.click(screen.getByTestId('login'));

  await waitFor(() => {
    expect(screen.getByText('login failed')).toBeInTheDocument();
  });
});
