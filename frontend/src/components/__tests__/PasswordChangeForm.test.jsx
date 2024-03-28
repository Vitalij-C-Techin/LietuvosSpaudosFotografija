import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../modules/language/i18n';
import PasswordChangeForm from '../parts/PasswordChangeForm';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Config from '../config/Config';
import { t } from 'i18next';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} }))
}));

let component;
beforeEach(() => {
  component = render(
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <BrowserRouter>
          <PasswordChangeForm />
        </BrowserRouter>
      </AuthProvider>
    </I18nextProvider>
  );
});

test('renders component correctly', () => {
  const formTitle = screen.getByTestId('form-title');
  const submitButton = screen.getByTestId('submit-button');

  expect(formTitle).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('handles successful form submission', async () => {
  const newPassword = 'StrongPassword123!';
  const confirmPassword = newPassword;
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  axios.post.mockResolvedValueOnce({ data: {} });

  fireEvent.change(screen.getByTestId('new-password-input'), {
    target: { value: newPassword }
  });
  fireEvent.change(screen.getByTestId('confirm-new-password-input'), {
    target: { value: confirmPassword }
  });
  fireEvent.click(screen.getByTestId('submit-button'));
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining(Config.apiDomain),
      expect.objectContaining({ password: newPassword })
    );

    expect(window.alert).toHaveBeenCalledWith(t('passwordChangePage.passwordChangeSuccessful'));
  });
  window.alert.mockRestore();
});

test('validates required fields', async () => {
  fireEvent.click(screen.getByTestId('submit-button'));

  await waitFor(() => {
    const newPasswordError = screen.getByTestId('new-password-error');
    const confirmPasswordError = screen.getByTestId('confirm-new-password-error');

    expect(newPasswordError).toBeInTheDocument();
    expect(confirmPasswordError).toBeInTheDocument();
  });
});

test('enforces password strength rules', async () => {
  const weakPassword = 'password';

  fireEvent.change(screen.getByTestId('new-password-input'), {
    target: { value: weakPassword }
  });
  fireEvent.click(screen.getByTestId('submit-button'));
  await waitFor(() => {
    const passwordError = screen.getByTestId('new-password-error');
    expect(passwordError).toBeInTheDocument();
    expect(passwordError).toHaveTextContent(t('passwordChangePage.passwordPattern'));
  });
});

test('validates matching passwords', async () => {
  const newPassword = 'Password123!';
  const differentConfirmPassword = 'differentpassword!';

  fireEvent.change(screen.getByTestId('new-password-input'), {
    target: { value: newPassword }
  });
  fireEvent.change(screen.getByTestId('confirm-new-password-input'), {
    target: { value: differentConfirmPassword }
  });

  fireEvent.click(screen.getByTestId('submit-button'));
  await waitFor(() => {
    const confirmPasswordError = screen.getByTestId('confirm-new-password-error');
    expect(confirmPasswordError).toBeInTheDocument();
    expect(confirmPasswordError).toHaveTextContent(t('passwordChangePage.passwordNotMatch'));
  });
});

test('displays error message on successful form submission with netwrok error', async () => {
  const errorMessage = 'Įvyko klaida. Prašome bandyti vėliau.';
  jest.spyOn(axios, 'post').mockRejectedValue(new Error(errorMessage));

  await waitFor(() => {
    const newPasswordInput = screen.getByTestId('new-password-input');
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123!' } });

    const confirmNewPasswordInput = screen.getByTestId('confirm-new-password-input');
    fireEvent.change(confirmNewPasswordInput, { target: { value: 'newPassword123!' } });

    fireEvent.click(screen.getByTestId('submit-button'));
    const formTitle = screen.getByTestId('form-title');
    const submitButton = screen.getByTestId('submit-button');
    expect(formTitle).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    const emailError = screen.getByTestId('validation-error');

    expect(emailError).toBeInTheDocument();

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
