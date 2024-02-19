import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Container, Card, Col, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

//TODO check layout after more work is done
//TODO check console.log if any left

const RegistrationForm = () => {
  const { t } = useTranslation();
  const [selectedActivity, setSelectedActivity] = useState(``);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birth_year: '',
    phone_number: '',
    email: '',
    password: '',
    media_name: ''
  });

  const validatePassword = (value) => {
    const errors = [];
    const minPasswordLength = 6;
    const maxPasswordLength = 20;
    if (value !== formData.confirmPassword) {
      errors.push(t('registrationPage.password1'));
    }
    if (value.length < minPasswordLength || value.length > maxPasswordLength) {
      errors.push(
        t('registrationPage.password2', {
          min: minPasswordLength,
          max: maxPasswordLength
        })
      );
    }
    if (!/[A-Z]/.test(value)) {
      errors.push(t('registrationPage.password3'));
    }
    if (!/\d/.test(value)) {
      errors.push(t('registrationPage.password4'));
    }

    setPasswordError(errors.join(' '));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'phone_number') {
      validatePhone(value);
    }

    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      validatePassword(value);
    }
  };

  const validatePhone = (phone_number) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;

    if (!phoneRegex.test(phone_number)) {
      setPhoneError(t('registrationPage.phoneError'));
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const birthYear = new Date(formData.birth_year).getFullYear();
      const response = await axios.post('http://localhost:8080/api/v1/register', {
        ...formData,
        birth_year: birthYear
      });
      alert(t('registrationPage.registerSuccessuful'));
      window.location.href = '/login';
    } catch (error) {
      if (error.response.status === 400) {
        setEmailError(t('registerSuccessuful.emailError'));
      }
    }

    if (!passwordError) {
      return;
    } else {
      alert(t('registrationPage.error'));
    }
  };

  const handleChangeActivity = (e) => {
    setSelectedActivity(e.target.value);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{t('registrationPage.title')}</h2>
      <form onSubmit={handleSubmit}>
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
        <label htmlFor="name">{t('registrationPage.name')}</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder={t('registrationPage.namePlaceholder')}
        />
        <br />
        <label htmlFor="surname">{t('registrationPage.surname')}</label>
        <br />
        <input
          type="text"
          name="surname"
          id="surname"
          required
          onChange={handleChange}
          placeholder={t('registrationPage.surnamePlaceholder')}
        />
        <br />
        <label htmlFor="email">{t('registrationPage.email')}</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="egzamle@egzample.com"
          autoComplete="email"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">{t('registrationPage.password')}</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder={t('registrationPage.passwordPlaceholder')}
          autoComplete="new-password"
        />
        <br />
        <label htmlFor="confirmPassword">{t('registrationPage.confirmPassword')}</label>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        <br />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          onChange={handleChange}
          placeholder={t('registrationPage.cpasswordPlaceholder')}
          autoComplete="new-password"
        />
        <br />
        <label htmlFor="birth_year">{t('registrationPage.byear')}</label>
        <br />
        <input
          type="text"
          name="birth_year"
          pattern="\d{4}"
          id="birth_year"
          required
          onChange={handleChange}
          placeholder={t('registrationPage.byearPlaceholder')}
        />
        <br />
        <label htmlFor="phone_number">{t('registrationPage.phoneNumber')}</label>
        <br />
        <PhoneInput
          international
          id="phone_number"
          name="phone_number"
          defaultCountry="LT"
          required
          value={formData.phone_number}
          onChange={(value) => {
            setFormData((prevData) => ({ ...prevData, phone_number: value }));
            validatePhone(value);
          }}
        />
        <br />
        <label htmlFor="activity">{t('registrationPage.activity')} </label>
        <br />

        <select
          name="activity"
          id="activity"
          size={1}
          value={selectedActivity}
          onChange={handleChangeActivity}
        >
          <option value="fworker">{t('registrationPage.work1')}</option>
          <option value="mworker">{t('registrationPage.work2')} </option>
        </select>
        <br />
        {selectedActivity === 'mworker' && (
          <>
            <label htmlFor="media_name">{t('registrationPage.textArea')}</label>
            <br />
            <textarea
              name="media_name"
              cols="30"
              id="media_name"
              rows="3"
              required
              onChange={handleChange}
            ></textarea>
          </>
        )}
        <br />
        <input type="checkbox" id="Uagreement" name="Uagreement" required />
        <label htmlFor="Uagreement">{t('registrationPage.Uagreement')} </label>
        <br />

        <button type="submit">{t('registrationPage.button')}</button>
      </form>
    </div>
    <>
      <Container className="registration-form-container mb-5">
        <Row className="justify-content-md-center">
          <Col xs="12" sm="8" md="6" lg="4">
            <Card className="my-5">
              <h2>User Registration</h2>
            </Card>
            <Form onSubmit={handleSubmit}>
              {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label htmlFor="fname">Name*</Form.Label>

                    <Form.Control
                      type="text"
                      name="fname"
                      id="fname"
                      required
                      placeholder="Enter name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label htmlFor="lname">Surname*</Form.Label>

                    <Form.Control
                      type="text"
                      name="lname"
                      id="lname"
                      required
                      placeholder="Enter surname"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label htmlFor="email">Email*</Form.Label>

                <Form.Control
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="egzamle@egzample.com"
                  autoComplete="email"
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupEnterPassword">
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
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
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
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md="6" lg="6">
                  <Form.Group className="mb-3" controlId="formGroupBirthYear">
                    <Form.Label htmlFor="byear">Birth Year*</Form.Label>

                    <Form.Control
                      type="date"
                      name="byear"
                      id="byear"
                      required
                      placeholder="Enter date of Birth"
                    />
                  </Form.Group>
                </Col>
                <Col md="6" lg="6" >
                  <Form.Group className="mb-3" controlId="formGroupPhoneNumber">
                    <Form.Label htmlFor="phone">Phone Number*</Form.Label>

                    <PhoneInput
                    className="mt-2"
                      international
                      id="phone"
                      defaultCountry="LT"
                      value={formData.phone}
                      onChange={(value) => {
                        setFormData((prevData) => ({ ...prevData, phone: value }));
                        validatePhone(value);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formGroupActivity">
                <Form.Label htmlFor="activity">State of work </Form.Label>

                <Form.Select
                  name="activity"
                  id="activity"
                  size={1}
                  value={selectedActivity}
                  onChange={handleChangeActivity}
                >
                  <option value="fworker">freelancer</option>
                  <option value="mworker">media worker</option>
                </Form.Select>

                {selectedActivity === 'mworker' && (
                  <>
                    <Form.Label htmlFor="wdyof">Who do you work for?</Form.Label>
                    <Form.Control id="wdyof" as="textarea" required></Form.Control>
                  </>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupUserAgreement">
                <Form.Check
                  type="checkbox"
                  id="Uagreement"
                  name="Uagreement"
                  label="User agreement"
                  required
                />
              </Form.Group>

              <Button>SUBMIT</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationForm;
