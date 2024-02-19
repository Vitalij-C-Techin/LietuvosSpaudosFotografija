import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Container, Card, Col, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../modules/AuthContext';
import { useTranslation } from 'react-i18next';

const LoginForm = (onLogin) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const navigateToRegistrationPage = () => {
    navigate('/registration');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t('loginPage.noUser'));
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/login`, {
        email: email,
        password: password
      });
      if (response.status === 200) {
        login();
        navigate('/');
      } else {
        throw new Error(t('loginPage.loginFail'));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(t('loginPage.invalidCredentials'));
      }
    }
  };
  return (
    <>
      <section>
        <h2 style={{ textAlign: 'center' }}>{t('loginPage.title')}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

      <Container className="form-container justify-content-md-center">
        <Row className="justify-content-md-center">
        <Col xs="12" sm ="8" md="6" lg="4">
        <Card className="my-5">
          {/* <Card.Body> */}
            <h2>LOG IN TO </h2>
            <h2>TO YOUR ACCOUNT</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          {/* </Card.Body> */}
        </Card>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>{t('loginPage.email')}</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="egzamle@egzample.com"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>{t('loginPage.password')}</Form.Label>
            <Form.Control
              type="password"
              autoComplete="new-password"
              placeholder={t('registrationPage.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGroupLinks">
            <Row className="align-items-center">
              <Link to="/forgotpassword">{t('loginPage.forgotPassword')}</Link>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupButton">
            <Row className="align-items-center">
              <Col xs={12} md={6}>
                <Button variant="light" type="submit">
                  {t('loginPage.login')}
                </Button>
              <Col className="mt-3"  xs={12} md={6}>
                <Button type="submit">LOGIN</Button>
              </Col>

              <Col xs={12} md={6}>
                <Button variant="light" type="button" onClick={navigateToRegistrationPage}>
                  {t('loginPage.register')}
              <Col className="mt-3"  xs={12} md={6} >
                <Button type="button" onClick={navigateToRegistrationPage}>
                  REGISTER
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

export default LoginForm;
