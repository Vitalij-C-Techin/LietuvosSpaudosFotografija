import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../modules/language/i18n';
import PasswordChangeForm from '../parts/PasswordChangeForm';

jest.mock('axios');

test('displays error message on unsuccessful form submission', async () => {
  const errorMessage = 'An error occurred. Please try again later.';
  const mockError = new Error(errorMessage);
  axios.post.mockRejectedValue(mockError);

  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <PasswordChangeForm />
      </I18nextProvider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTestId('submit-button'));

  await waitFor(() => {
    
    const newPasswordError = screen.getByTestId('new-password-error');
    const confirmNewPasswordError = screen.getByTestId('confirm-new-password-error');
    const emailError = screen.getByTestId('validation-error');

    expect(emailError).toBeInTheDocument();
    expect(newPasswordError).toBeInTheDocument();
    expect(confirmNewPasswordError).toBeInTheDocument();

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});

