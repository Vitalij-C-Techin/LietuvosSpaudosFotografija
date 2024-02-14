import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ForgotPasswordForm from '../parts/ForgotPasswordForm';

jest.mock('axios');

test('displays success message on succesfull email submission', async () => {
  const mockResponse = { status: 200 };
  axios.post.mockResolvedValue(mockResponse);

  render(<ForgotPasswordForm />);

  const emailInput = screen.getByPlaceholderText('Enter your email here');
  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });

  fireEvent.click(screen.getByText('Recover button'));

  await waitFor(() =>
    expect(
      screen.getByText('If the email exists in our database, a password reset link will be sent.')
    ).toBeInTheDocument()
  );
});

test('displays error message in unsuccessful email submission', async () => {
  const errorMessage = 'Error sending email recovery email';
  const mockError = new Error(errorMessage);
  axios.post.mockRejectedValue(mockError);

  render(<ForgotPasswordForm />);

  const emailInput = screen.getByPlaceholderText('Enter your email here');
  fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });

  fireEvent.click(screen.getByText('Recover button'));

  await waitFor(() => {
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });
});


