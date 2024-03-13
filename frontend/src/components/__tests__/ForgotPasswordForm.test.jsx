import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ForgotPasswordForm from '../parts/ForgotPasswordForm';
import i18n from '../../modules/language/i18n';
import { I18nextProvider } from 'react-i18next';

jest.mock('axios');

test('displays success message on successful email submission', async () => {
  const mockResponse = { status: 202 };
  axios.post.mockResolvedValue(mockResponse);

  render(<ForgotPasswordForm />);

  const emailInput = screen.getByTestId('email-input');
  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });

  fireEvent.click(screen.getByTestId('recover-button'));

  // Wait for the axios call to complete
  await waitFor(() => {
    expect(screen.getByTestId('success-message')).toBeInTheDocument();
  });
});

test('displays error message on unsuccessful email submission', async () => {
  const errorMessage = 'forgotPasswordForm.emailSendingError';
  const mockError = new Error(errorMessage);
  axios.post.mockRejectedValue(mockError);

  render(
    <I18nextProvider i18n={i18n}>
      <ForgotPasswordForm />
    </I18nextProvider>
  );

  const emailInput = screen.getByTestId('email-input');
  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });

  fireEvent.click(screen.getByTestId('recover-button'));

  await waitFor(() => {
    const errorMsg = screen.getByTestId('error-message');
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg.textContent).toContain(i18n.t(errorMessage));
  });
});
