import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ForgotPasswordForm from '../parts/ForgotPasswordForm';

jest.mock('axios');

test('displays success message on successful email submission', async () => {
  const mockResponse = { status: 200 };
  axios.post.mockResolvedValue(mockResponse);

  render(<ForgotPasswordForm />);

  const emailInput = screen.getByTestId('email-input'); // Use data-testid
  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });

  fireEvent.click(screen.getByTestId('recover-button')); // Use data-testid

  await waitFor(() =>
    expect(
      screen.getByText('If the email exists in our database, a password reset link will be sent.')
    ).toBeInTheDocument()
  );
});

test('displays error message on unsuccessful email submission', async () => {
  const errorMessage = 'An error occurred. Please try again later.';
  const mockError = new Error(errorMessage);
  axios.post.mockRejectedValue(mockError);

  render(<ForgotPasswordForm />);

  const emailInput = screen.getByTestId('email-input'); // Use data-testid
  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });

  fireEvent.click(screen.getByTestId('recover-button')); // Use data-testid

  await waitFor(() => {
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
