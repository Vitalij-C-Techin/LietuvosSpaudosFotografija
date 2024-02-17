import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Container, Card, Col, Form, Row, Button } from 'react-bootstrap';

//TODO email verification(backend needed with DB)
//TODO Password correction if needed
//TODO check layout after more work is done

const RegistrationForm = () => {
  const [selectedActivity, setSelectedActivity] = useState(``);
  const [phoneError, setPhoneError] = useState('');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'phone') {
      validatePhone(value);
    }

    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      const { password } = formData;
      const errors = [];
      const minPasswordLength = 6;
      const maxPasswordLength = 20;

      if (value !== password) {
        errors.push('Passwords do not match!');
      }
      if (value.length < minPasswordLength || value.length > maxPasswordLength) {
        errors.push(
          `Password must be between ${minPasswordLength} and ${maxPasswordLength} characters.`
        );
      }
      if (!/[A-Z]/.test(value)) {
        errors.push('Password must contain at least one uppercase letter.');
      }
      if (!/\d/.test(value)) {
        errors.push('Password must contain at least one number.');
      }

      setPasswordError(errors.join(' '));
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;

    if (!phoneRegex.test(phone)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError) {
      console.log('Registration successfull');
    } else {
      alert('Fill form correctly');
    }
  };
  const handleChangeActivity = (e) => {
    setSelectedActivity(e.target.value);
  };

  return (
    <>
    <Container className="registration-form-container">
      <Row className="justify-content-md-center">
        <Col xs="12" sm ="8" md="6" lg="4">
      <Card className="my-5">
      <h2>User Registration</h2>
      </Card>
      <Form onSubmit={handleSubmit}>
        {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
        <Form.Label htmlFor="fname">Name*</Form.Label>
   
        <Form.Control type="text" name="fname" id="fname" required placeholder="Enter name" />
       <Form.Label htmlFor="lname">Surname*</Form.Label>
        
        <Form.Control type="text" name="lname" id="lname" required placeholder="Enter surname" />
       
        <Form.Label htmlFor="email">Email*</Form.Label>
    
        <Form.Control
          type="email"
          name="email"
          id="email"
          required
          placeholder="egzamle@egzample.com"
          autoComplete="email"
        />
       
        <Form.Label htmlFor="psw">Password*</Form.Label>
    
        <Form.Control
          type="password"
          name="password"
          id="psw"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          autoComplete="new-password"
        />
       
        <Form.Label htmlFor="spsw">Confirm Password*</Form.Label>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
  
        <Form.Control
          type="password"
          name="confirmPassword"
          id="spsw"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          autoComplete="new-password"
        />
       
        <Form.Label htmlFor="byear">Birth Year*</Form.Label>
       
        <Form.Control type="date" name="byear" id="byear" required placeholder="Enter date of Birth" />
       
        <Form.Label htmlFor="phone">Phone Number*</Form.Label>
     
        <PhoneInput
          international
          id="phone"
          defaultCountry="LT"
          value={formData.phone}
          onChange={(value) => {
            setFormData((prevData) => ({ ...prevData, phone: value }));
            validatePhone(value);
          }}
        />
   
        <Form.Label htmlFor="activity">State of work </Form.Label>
        <br />

        <select
          name="activity"
          id="activity"
          size={1}
          value={selectedActivity}
          onChange={handleChangeActivity}
        >
          <option value="fworker">freelancer</option>
          <option value="mworker">media worker</option>
        </select>
        <br />
        {selectedActivity === 'mworker' && (
          <>
            <Form.Label htmlFor="wdyof">Who do you work for?</Form.Label>
            <br />
            <textarea name="message" cols="30" id="wdyof" rows="3" required></textarea>
          </>
        )}
       
        <Form.Check type="checkbox" id="Uagreement" name="Uagreement" required />
        <Form.Label htmlFor="Uagreement">User agreement</Form.Label>
       

        <Button>SUBMIT</Button>
      </Form>
      </Col>
      </Row>
      </Container>
    </>
    
  );
};

export default RegistrationForm;
