import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function LoginPageForm() {
  return (
    <>  
        
        <Form style={{margin:"auto", width: "30%"}}>

            <Form.Group style={{textAlign:"center"}} className="mb-3" controlId="formGroupHeadline">
            <h2>Log in to your Account</h2>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"  />
            </Form.Group>

            <Form.Group style={{textAlign:"center"}} className="mb-3" controlId="formGroupLinks">
                <Row className="align-items-center">
                    <Col>
                        <a href="url">Forgot password?</a>
                    </Col>
                    <Col>
                        <a href="url">Register</a>
                    </Col>
                </Row>
              
            </Form.Group>
      
            <Form.Group style={{margin:"auto", width: "50%"}} className="d-grid gap-2" controlId="formGroupButton">
            <Button  variant="light" type="login">
                Login
            </Button>
            </Form.Group>
        </Form>

    </>
  );
}

export default LoginPageForm;