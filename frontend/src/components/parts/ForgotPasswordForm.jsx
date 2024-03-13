import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Card, Col, Form, Row, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { validateEmail } from './EmailVerification';

const ForgotPasswordForm = () => {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors },
    clearErrors
  } = useForm();

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
          setMessage(t('forgotPasswordForm.emailFound'));
        } else {
          setError('email', { type: 'manual', message: response.data.message });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError('email', {
            type: 'manual',
            message: t('forgotPasswordForm.userNotFound', { email })
          });
        } else {
          setError('email', { type: 'manual', message: t('forgotPasswordForm.emailSendingError') });
        }
      });
  };
  useEffect(() => {
    clearErrors();
  }, [i18n.language, clearErrors]);

  return (
    <>
      <Container className="fpassword-form-container">
        <Row className="justify-content-md-center">
          <Col xs="12" sm="8" md="6" lg="4">
            <Card className="my-5">
              <h2 style={{ textAlign: 'center' }}> {t('forgotPasswordForm.resetPassword')}</h2>
            </Card>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              {message && <p data-testid="success-message">{message}</p>}
              {errors.email && (
                <p className="text-danger" data-testid="error-message">
                  {errors.email.message}
                </p>
              )}
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control
                  type="email"
                  {...register('email', {
                    required: t('forgotPasswordForm.required'),
                    pattern: {
                      validate: (value) => validateEmail(value)
                    }
                  })}
                  placeholder={t('forgotPasswordForm.formPlaceholderText')}
                  data-testid="email-input"
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
