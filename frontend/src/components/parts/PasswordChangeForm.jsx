import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate, useLocation } from 'react-router-dom';
import Config from '../config/Config';

const PasswordChangeForm = () => {
  const { t, i18n } = useTranslation();
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get('token');
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      new_password: '',
      confirm_new_password: ''
    },
    criteriaMode: 'all'
  });

  const new_password = watch('new_password');

  const handleFormSubmit = async (formData) => {
    const { new_password } = formData;
    const url = Config.apiDomain + Config.endpoints.user.passwordChange + resetToken;
    axios
      .post(url, {
        password: new_password
      })
      .then((response) => {
        alert(t('passwordChangePage.passwordChangeSuccessful'));
        navigate('/login');
      })
      .catch((error) => {
        setErrorMessage(true);
      });
  };

  useEffect(() => {}, [resetToken]);

  useEffect(() => {
    clearErrors();
  }, [i18n.language, clearErrors]);

  return (
    <>
      <Container className="password-change-form-container mb-5">
        <Row className="justify-content-md-center">
          <Col xs="12" sm="8" md="6" lg="4">
            <Card className="my-5">
              <h2 data-testid="form-title" style={{ textAlign: 'center' }}>
                {t('passwordChangePage.title')}
              </h2>
            </Card>

            <Form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
              {errorMessage && (
                <p data-testid="validation-error" style={{ color: 'red' }}>
                  {t('passwordChangePage.emailError')}
                </p>
              )}

              <Form.Group className="mb-3">
                <Form.Label htmlFor="new_password">
                  {t('passwordChangePage.newPassword')}
                </Form.Label>
                <Form.Control
                  data-testid="new-password-input"
                  type="password"
                  name="new_password"
                  id="new_password"
                  autoComplete="new-password"
                  placeholder={t('passwordChangePage.newPasswordPlaceholder')}
                  {...register('new_password', {
                    required: t('passwordChangePage.required'),
                    minLength: {
                      value: 8,
                      message: t('passwordChangePage.passwordMinLength')
                    },
                    maxLength: {
                      value: 50,
                      message: t('passwordChangePage.passwordMaxLength')
                    },
                    pattern: {
                      value: /^(?!.*\s)(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()]).+$/,
                      message: t('passwordChangePage.passwordPattern')
                    }
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="new_password"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p
                        data-testid="new-password-error"
                        className="text-danger mb-1"
                        style={{ fontSize: '14px' }}
                        key={type}
                      >
                        {message}
                      </p>
                    ))
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="confirm_new_password">
                  {t('passwordChangePage.confirmNewPassword')}
                </Form.Label>
                <Form.Control
                  data-testid="confirm-new-password-input"
                  type="password"
                  name="confirm_new_password"
                  id="confirm_new_password"
                  autoComplete="new-password"
                  placeholder={t('passwordChangePage.confirmNewPasswordPlaceholder')}
                  {...register('confirm_new_password', {
                    required: t('passwordChangePage.required'),
                    validate: (value) =>
                      value === new_password || t('passwordChangePage.passwordNotMatch')
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="confirm_new_password"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p
                        data-testid="confirm-new-password-error"
                        className="text-danger"
                        style={{ fontSize: '14px' }}
                        key={type}
                      >
                        {message}
                      </p>
                    ))
                  }
                />
              </Form.Group>

              <Button type="submit" data-testid="submit-button">
                {t('passwordChangePage.button')}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PasswordChangeForm;
