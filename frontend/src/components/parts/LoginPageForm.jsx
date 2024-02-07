import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function LoginPageForm() {
  return (
    <>  
         <section style={{padding:"50px"}}>
            
            <h2>Log in to your account</h2>

            <Form style={{margin:"auto", width: "30%", textAlign:"center"}}>    
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
                        <div style={{ textAlign: "left" }}>
                            <a href="url">Forgot password?</a>
                        </div>
                        </Col>
                    </Row>
                
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formGroupButton">
                    <Row className="align-items-center">
                        <Col  xs={12} md={6}>
                            <Button  variant="light" type="login" style={{ width: "100%" }}>
                                Login
                            </Button>
                        </Col>
                        <Col  xs={12} md={6}>
                            <Button  variant="light" type="login" style={{ width: "100%" }}>
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