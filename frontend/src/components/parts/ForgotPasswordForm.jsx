import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Card, Col, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { validateEmail } from './EmailVerification';

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const { isValid, errorMessage } = validateEmail(email, t);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setErrors({ email: errorMessage });
  
    if (isValid) {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/forget-password', {
          email
        });
  
        if (response.status === 202) {
          setMessage('Email found in our database, a password reset link will be sent.');
        } else if (response.status === 404) {
          setMessage('User with ' + email + ' not found in our database.');
        } else {
          setMessage('Error sending password recovery email');
          setErrors({ email: response.data.message });
        }
      } catch (error) {
        setMessage('Error sending password recovery email');
        setErrors({ email: error.message });
      }
    }
  };
  

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const { isValid, errorMessage } = validateEmail(newEmail, t);
    setErrors({ email: isValid ? null : errorMessage });
  };

  return (
    <>
      <Container className="fpassword-form-container">
        <Row className="justify-content-md-center">
          <Col xs="12" sm="8" md="6" lg="4">
            <Card className="my-5">
              <h2>{t('forgotPasswordForm.resetPassword')}</h2>
              {message && <p>{message}</p>}
            </Card>
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={t('forgotPasswordForm.formPlaceholderText')}
                  data-testid="email-input"
                />
                {errors.email && (
                  <p className="text-danger" data-testid="error-message">
                    {errors.email}
                  </p>
                )}
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
