import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import RegistrationForm from '../parts/RegistrationForm';
import axios from 'axios';
import i18n from '../../modules/language/i18n';

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({data: {}}))
}));

global.alert = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
}));

const mockedUsedNavigate = jest.fn();

describe('RegistrationForm', () => {
    test('component renders successfully', () => {
        render(<RegistrationForm/>);

        const formTitle = screen.getByTestId('form-title');
        const nameFieldTitle = screen.getByTestId('name-input');
        const submitButton = screen.getByTestId('submit-button');

        expect(formTitle).toBeInTheDocument();
        expect(nameFieldTitle).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('displays error message for empty required fields', async () => {
        render(<RegistrationForm/>);

        fireEvent.click(screen.getByTestId('submit-button'));

        const errorMessages = await screen.findAllByText(i18n.t('registrationPage.required'));

        expect(errorMessages.length).toBeGreaterThan(0);
        errorMessages.forEach((errorMessage) => {
            expect(errorMessage).toHaveClass('text-danger');
        });
    });

    test('displays error message for invalid name and surname inputs', async () => {
        render(<RegistrationForm/>);

        fireEvent.change(screen.getByTestId('name-input'), {
            target: {value: 's'}
        });
        fireEvent.change(screen.getByTestId('surname-input'), {
            target: {value: 'baafdfdgfdgfhmhghghkreklklreklrkreklfkfjfjkfffdfdkjfjkffdjk'}
        });

        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            const nameValidationMessage = screen.getByText(i18n.t('registrationPage.nameMinLength'));
            expect(nameValidationMessage).toBeInTheDocument();
            expect(nameValidationMessage).toHaveClass('text-danger');

            const surnameValidationMessage = screen.getByText(
                i18n.t('registrationPage.surnameMaxLength')
            );
            expect(surnameValidationMessage).toBeInTheDocument();
            expect(surnameValidationMessage).toHaveClass('text-danger');
        });
    });

    test('displays error message for invalid email input pattern', async () => {
        render(<RegistrationForm/>);

        fireEvent.change(screen.getByTestId('email-input'), {
            target: {value: 'lukne@brukne'}
        });

        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            const emailValidationMessage = screen.getByText(i18n.t('registrationPage.emailPattern'));
            expect(emailValidationMessage).toBeInTheDocument();
            expect(emailValidationMessage).toHaveClass('text-danger');
        });
    });

    test('displays error message for invalid phone input', async () => {
        render(<RegistrationForm/>);

        fireEvent.change(screen.getByTestId('phone-input'), {
            target: {value: '123'}
        });

        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            const phoneValidationMessage = screen.getByText(i18n.t('registrationPage.phoneError'));
            expect(phoneValidationMessage).toBeInTheDocument();
            expect(phoneValidationMessage).toHaveClass('text-danger');
        });
    });

    test('displays error message for invalid birth year input', async () => {
        render(<RegistrationForm/>);

        fireEvent.change(screen.getByTestId('birth-year-input'), {
            target: {value: '2022'}
        });

        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            const phoneValidationMessage = screen.getByText(i18n.t('registrationPage.birthYearMax'));
            expect(phoneValidationMessage).toBeInTheDocument();
            expect(phoneValidationMessage).toHaveClass('text-danger');
        });
    });

    test('displays error message for invalid password input', async () => {
        render(<RegistrationForm/>);

        fireEvent.change(screen.getByTestId('password-input'), {
            target: {value: 'qwerty'}
        });

        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            const phoneValidationMessage = screen.getByText(i18n.t('registrationPage.passwordPattern'));
            expect(phoneValidationMessage).toBeInTheDocument();
            expect(phoneValidationMessage).toHaveClass('text-danger');
        });
    });

    test('displays error message than password and confirm password does not match', async () => {
        render(<RegistrationForm/>);

        fireEvent.change(screen.getByTestId('password-input'), {
            target: {value: 'ValidPassword1'}
        });

        fireEvent.change(screen.getByTestId('confirm-password-input'), {
            target: {value: 'invalidpassword'}
        });

        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            const phoneValidationMessage = screen.getByText(i18n.t('registrationPage.passwordNotMatch'));
            expect(phoneValidationMessage).toBeInTheDocument();
            expect(phoneValidationMessage).toHaveClass('text-danger');
        });
    });

    test('displays media name field after selecting media worker from activity dropdown', async () => {
        render(<RegistrationForm/>);

        fireEvent.change(screen.getByTestId('activity-input'), {
            target: {value: 'mediaWorker'}
        });

        const mediaNameInput = screen.getByTestId('media-name-input');
        expect(mediaNameInput).toBeInTheDocument();
    });

    test('checkbox can be checked', async () => {
        render(<RegistrationForm/>);

        const agreementCheckbox = screen.getByTestId('agreement-input');
        expect(agreementCheckbox).not.toBeChecked();

        fireEvent.click(agreementCheckbox);

        expect(agreementCheckbox).toBeChecked();
    });

    test('submits form with correct data', async () => {
        render(<RegistrationForm/>);

        const formData = {
            name: 'Saulė',
            surname: 'String',
            birth_year: '2000',
            phone_number: '+37063547532',
            email: 'saule@string.lt',
            password: 'Qwerty11*',
            confirm_password: 'Qwerty11*',
            media_name: 'LRT',
            user_agreement: true
        };

        fireEvent.change(screen.getByTestId('name-input'), {
            target: {value: formData.name}
        });
        fireEvent.change(screen.getByTestId('surname-input'), {
            target: {value: formData.surname}
        });
        fireEvent.change(screen.getByTestId('birth-year-input'), {
            target: {value: formData.birth_year}
        });
        fireEvent.change(screen.getByTestId('phone-input'), {
            target: {value: formData.phone_number}
        });
        fireEvent.change(screen.getByTestId('email-input'), {
            target: {value: formData.email}
        });
        fireEvent.change(screen.getByTestId('password-input'), {
            target: {value: formData.password}
        });

        fireEvent.change(screen.getByTestId('confirm-password-input'), {
            target: {value: formData.confirm_password}
        });

        fireEvent.change(screen.getByTestId('activity-input'), {
            target: {value: 'mediaWorker'}
        });

        fireEvent.change(screen.getByTestId('media-name-input'), {
            target: {value: formData.media_name}
        });

        fireEvent.click(screen.getByTestId('agreement-input'));

        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/v1/register', formData);
            expect(global.alert).toHaveBeenCalledWith(i18n.t('registrationPage.registerSuccessful'));
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
        });
    });
});
