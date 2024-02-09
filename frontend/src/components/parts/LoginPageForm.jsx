import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function LoginPageForm() {
  return (
    <>  
         <section>
            
            <h2>Log in to your account</h2>

            <Form>    
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  />
                </Form.Group>

                <Form.Group  className="mb-3" controlId="formGroupLinks">
                    <Row className="align-items-center">
                        <Col>
                        <div className="linkText">
                            <a href="url">Forgot password?</a>
                        </div>
                        </Col>
                    </Row>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formGroupButton">
                    <Row className="align-items-center">
                        <Col  xs={12} md={6}>
                            <Button  variant="light" type="login">
                                Login
                            </Button>
                        </Col>
                        <Col  xs={12} md={6}>
                            <Button  variant="light" type="login">
                                Register
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </section>
    </>
  );
}

export default LoginPageForm;