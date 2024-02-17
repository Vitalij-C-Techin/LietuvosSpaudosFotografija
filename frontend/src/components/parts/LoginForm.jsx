import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Container, Card, Col, Form, Row, Button } from 'react-bootstrap';
//TODO add logic to existing user if he enters wrong credentials

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const navigateToRegistrationPage = () => {
    navigate('/registration');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && !password) {
      setError('wrong password');
    } else if (!email && password) {
      setError('wrong email address');
    } else if (!email && !password) {
      setError('No such user');
    }
  };
  return (
    <>
      <Container className="form-container justify-content-md-center">
        <Row className="justify-content-md-center">
        <Col lg="4">
        <Card className="my-5">
          {/* <Card.Body> */}
            <h2>LOG IN TO </h2>
            <h2>TO YOUR ACCOUNT</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          {/* </Card.Body> */}
        </Card>
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

          <Form.Group controlId="formGroupLinks">
            <Row className="align-items-center">
              <Link to="/forgotpassword">Forgot password?</Link>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupButton">
            <Row className="align-items-center">
              <Col className="mt-3" xs={12} md={6}>
                <Button type="submit">LOGIN</Button>
              </Col>

              <Col className="mt-3" xs={12} md={6}>
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
