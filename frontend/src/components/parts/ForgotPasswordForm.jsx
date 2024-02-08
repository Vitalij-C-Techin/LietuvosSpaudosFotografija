import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function ForgotPasswordForm() {
  return (
    <>  
         <section>
            
            <h2>Reset Password</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iure debitis, minima aperiam dicta nobis corporis adipisci quisquam cum officia architecto a, nostrum dolorum libero dignissimos provident sequi sed labore.</p>

            <Form>    
                <Form.Group className="mb-3" controlId="formGroupEmail">
                   
                    <Form.Control type="email" placeholder='Enter your here' />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formGroupButton">
                    <Row className="align-items-center">
                        <Col  xs={12} md={6}>
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