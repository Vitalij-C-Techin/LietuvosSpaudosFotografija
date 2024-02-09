import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function ForgotPasswordForm() {
  return (
    <>  
         <section>
            
            <h2>Reset Password</h2>
            <p>Lorem ipsum dolor sit amet consectetur</p>

            <Form>    
                <Form.Group className="mb-3" controlId="formGroupEmail">
                   
                    <Form.Control type="email" placeholder='Enter your email here' />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formGroupButton">
                    <Row className="align-items-center">
                        <Col>
                            <Button  variant="light" type="recover">
                                Recover button
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </section>
    </>
  );
}

export default ForgotPasswordForm;