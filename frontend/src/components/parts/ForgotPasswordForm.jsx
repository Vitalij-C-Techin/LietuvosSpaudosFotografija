import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Card, Col, Form, Row, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ErrorMessage } from '@hookform/error-message';
import Config from '../config/Config';

const ForgotPasswordForm = () => {
  const { t, i18n } = useTranslation();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({ reValidateMode: 'onChange', criteriaMode: 'all' });

  const onSubmit = (data) => {
    const url = Config.apiDomain + Config.endpoints.user.forgetPassword;
    const { email } = data;
    axios
      .post(url, { email })
      .then((response) => {
        if (response.status === 202) {
          setSuccessMessage(true);
          setErrorMessage(false);
        }
      })
      .catch((error) => {
        setSuccessMessage(false);
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 5000);
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
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              {successMessage && (
                <p data-testid="success-message">{t('forgotPasswordForm.emailResetMessage')}</p>
              )}
              {errorMessage && (
                <p className="text-danger" data-testid="error-message">
                  {t('forgotPasswordForm.emailSendingError')}
                </p>
              )}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">{t('userDetailsUpdateForm.email')}</Form.Label>
                <Form.Control
                  data-testid="email-input"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  autoComplete="email"
                  {...register('email', {
                    required: t('forgotPasswordForm.required'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: t('userDetailsUpdateForm.emailPattern')
                    }
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
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
