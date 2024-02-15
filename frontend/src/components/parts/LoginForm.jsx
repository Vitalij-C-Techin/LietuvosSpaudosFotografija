import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../modules/AuthContext';

const LoginForm = (onLogin) => {
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
      setError('no such user');
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
        throw new Error('login failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      }
    }
  };
  return (
    <>
      <section>
        <h2>Log in to your account</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupLinks">
            <Row className="align-items-center">
              <Col>
                <div className="linkText">
                  <Link to="/forgotpassword">Forgot password?</Link>
                </div>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupButton">
            <Row className="align-items-center">
              <Col xs={12} md={6}>
                <Button variant="light" type="submit">
                  Login
                </Button>
              </Col>

              <Col xs={12} md={6}>
                <Button variant="light" type="button" onClick={navigateToRegistrationPage}>
                  Register
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </section>
    </>
  );
};

export default LoginForm;
