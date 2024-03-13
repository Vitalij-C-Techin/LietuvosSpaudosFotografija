import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Card, Col, Form, Row, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { validateEmail } from './EmailVerification';
import { ErrorMessage } from '@hookform/error-message';

const ForgotPasswordForm = () => {
  const { t, i18n } = useTranslation();
  const [errorSendingMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    trigger
  } = useForm({ criteriaMode: 'all' });

  const onSubmit = (data) => {
    const { email } = data;
    const { isValid, errorMessage } = validateEmail(email, t);

    if (!isValid) {
      setError('email', { type: 'manual', message: errorMessage });
      return;
    }

    axios
      .post('http://localhost:8080/api/v1/forget-password', { email })
      .then((response) => {
        if (response.status === 202) {
          setErrorMessage(false);
          setSuccessMessage(true);
        }
      })
      .catch(() => {
        setSuccessMessage(false);
        setErrorMessage(true);
      });
  };

  useEffect(() => {
    trigger();
  }, [i18n.language, trigger]);

  return (
    <>
      <Container className="fpassword-form-container">
        <Row className="justify-content-md-center">
          <Col xs="12" sm="8" md="6" lg="4">
            <Card className="my-5">
              <h2 style={{ textAlign: 'center' }}> {t('forgotPasswordForm.resetPassword')}</h2>
            </Card>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              {successMessage && <p>{t('forgotPasswordForm.emailResetMessage')}</p>}
              {errorSendingMessage && (
                <p className="text-danger" data-testid="error-message">
                  {t('forgotPasswordForm.emailSendingError')}
                </p>
              )}
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control
                  type="email"
                  name="email"
                  {...register('email', {
                    required: t('forgotPasswordForm.required'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: t('userDetailsUpdateForm.emailPattern')
                    }
                  })}
                  placeholder={t('forgotPasswordForm.formPlaceholderText')}
                  data-testid="email-input"
                />

                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => <p key={type}>{message}</p>)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupButton">
                <Row className="align-items-center">
                  <Col>
                    <Button variant="secondary" type="submit" data-testid="recover-button">
                      {t('forgotPasswordForm.recoverButton')}
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPasswordForm;
