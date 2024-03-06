import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ForgotPasswordForm from '../parts/ForgotPasswordForm';

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
  const errorMessage = 'Klaida siunčiant slaptažodžio atkūrimo el. laišką.';
  const mockError = new Error(errorMessage);
  axios.post.mockRejectedValue(mockError);

  render(<ForgotPasswordForm />);

  const emailInput = screen.getByTestId('email-input');
  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });

  fireEvent.click(screen.getByTestId('recover-button'));

  await waitFor(() => {
    const errorMsg = screen.getByTestId('error-message');
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg.textContent).toContain(errorMessage);
  });
});
