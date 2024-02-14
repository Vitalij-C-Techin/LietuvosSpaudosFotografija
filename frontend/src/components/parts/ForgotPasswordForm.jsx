import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/forget-password', {
        email
      });

      if (response.status === 200) {
        setMessage('If the email exists in our database, a password reset link will be sent.');
      } else {
        setMessage('Error sending password recovery email');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };
  return (
    <>
      <section>
        <h2>Reset Password</h2>
        {message && <p>{message}</p>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupButton">
            <Row className="align-items-center">
              <Col>
                <Button variant="light" type="submit">
                  Recover button
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </section>
    </>
  );
};

export default ForgotPasswordForm;
