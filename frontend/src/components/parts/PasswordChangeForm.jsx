import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate, useLocation } from 'react-router-dom';

const PasswordChangeForm = () => {
  const { t } = useTranslation();
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get('token'); // Get reset token from query parameters

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      new_password: '',
      confirm_new_password: '',
    },
    criteriaMode: 'all',
  });

  const new_password = watch('new_password');

  const handleFormSubmit = async (formData) => {
    axios
      .post(`http://localhost:8080/api/v1/change-password?token=${resetToken}`, formData)
      .then((response) => {
        alert(t('passwordChangePage.passwordChangeSuccessful'));
        navigate('/login');
      })
      .catch((error) => setEmailError(t('passwordChangePage.emailError')));
  };

  useEffect(() => {
    // Additional logic can be implemented here, such as checking the validity of the reset token.
  }, [resetToken]);

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
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

              <Form.Group className="mb-3">
                <Form.Label htmlFor="new_password">{t('passwordChangePage.newPassword')}</Form.Label>
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
                      message: t('passwordChangePage.passwordMinLength'),
                    },
                    maxLength: {
                      value: 50,
                      message: t('passwordChangePage.passwordMaxLength'),
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).+$/,
                      message: t('passwordChangePage.passwordPattern'),
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="new_password"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p className="text-danger mb-1" style={{ fontSize: '14px' }} key={type}>
                        {message}
                      </p>
                    ))
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="confirm_new_password">{t('passwordChangePage.confirmNewPassword')}</Form.Label>
                <Form.Control
                  data-testid="confirm-new-password-input"
                  type="password"
                  name="confirm_new_password"
                  id="confirm_new_password"
                  autoComplete="new-password"
                  placeholder={t('passwordChangePage.confirmNewPasswordPlaceholder')}
                  {...register('confirm_new_password', {
                    required: t('passwordChangePage.required'),
                    validate: (value) => value === new_password || t('passwordChangePage.passwordNotMatch'),
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="confirm_new_password"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p className="text-danger" style={{ fontSize: '14px' }} key={type}>
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

