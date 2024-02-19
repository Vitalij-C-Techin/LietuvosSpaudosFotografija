import { useState, useEffect } from 'react';
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
    confirmPassword: '',
    media_name: ''
  });

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      validatePassword();
    }
  }, [formData.password, formData.confirmPassword]);


const validatePassword = () => {
  const errors = [];
  const { password, confirmPassword } = formData;
  const minPasswordLength = 6;
  const maxPasswordLength = 20;

  if (password !== confirmPassword) {
    errors.push(t('registrationPage.password1'));
  }
  if (password.length < minPasswordLength || password.length > maxPasswordLength) {
    errors.push(t('registrationPage.password2', 
    { min: minPasswordLength, max: maxPasswordLength }));
  }
  if (!/[A-Z]/.test(password)) {
    errors.push(t('registrationPage.password3'));
  }
  if (!/\d/.test(password)) {
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
    <>
      <Container className="registration-form-container mb-5">
        <Row className="justify-content-md-center">
          <Col xs="12" sm="8" md="6" lg="4">
            <Card className="my-5">
            <h2 style={{ textAlign: 'center' }}>{t('registrationPage.title')}</h2>
            </Card>
            <Form onSubmit={handleSubmit}>
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label htmlFor="name">{t('registrationPage.name')}</Form.Label>

                    <Form.Control
                     type="text"
                     name="name"
                     id="name"
                     onChange={handleChange}
                     required
                     autoComplete="name"
                     placeholder={t('registrationPage.namePlaceholder')}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label htmlFor="surname">{t('registrationPage.surname')}</Form.Label>

                    <Form.Control
                     type="text"
                     name="surname"
                     id="surname"
                     required
                     onChange={handleChange}
                     placeholder={t('registrationPage.surnamePlaceholder')}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label htmlFor="email">{t('registrationPage.email')}</Form.Label>

                <Form.Control
                type="email"
                name="email"
                id="email"
                required
                placeholder="egzamle@egzample.com"
                autoComplete="email"
                onChange={handleChange}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupEnterPassword">
                    <Form.Label htmlFor="password">{t('registrationPage.password')}</Form.Label>

                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={t('registrationPage.passwordPlaceholder')}
                      autoComplete="new-password"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                    <Form.Label htmlFor="confirmPassword">{t('registrationPage.confirmPassword')}</Form.Label>
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      required
                      onChange={handleChange}
                      placeholder={t('registrationPage.cpasswordPlaceholder')}
                      autoComplete="new-password"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md="6" lg="6">
                  <Form.Group className="mb-3" controlId="formGroupBirthYear">
                    <Form.Label htmlFor="birth_year">{t('registrationPage.byear')}</Form.Label>

                    <Form.Control
                      type="text"
                      name="birth_year"
                      pattern="\d{4}"
                      id="birth_year"
                      required
                      onChange={handleChange}
                      placeholder={t('registrationPage.byearPlaceholder')}
                    />
                  </Form.Group>
                </Col>
                <Col md="6" lg="6" >
                  <Form.Group className="mb-3" controlId="formGroupPhoneNumber">
                    <Form.Label htmlFor="phone_number">{t('registrationPage.phoneNumber')}</Form.Label>

                    <PhoneInput
                    className="mt-2"
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
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formGroupActivity">
                <Form.Label htmlFor="activity">{t('registrationPage.activity')}</Form.Label>

                <Form.Select
                  name="activity"
                  id="activity"
                  size={1}
                  value={selectedActivity}
                  onChange={handleChangeActivity}
                >
                  <option value="fworker">{t('registrationPage.work1')}</option>
                  <option value="mworker">{t('registrationPage.work2')}</option>
                </Form.Select>

                {selectedActivity === 'mworker' && (
                  <>
                    <Form.Label htmlFor="media_name">{t('registrationPage.textArea')}</Form.Label>
                    <Form.Control id="media_name" as="textarea" required  onChange={handleChange}></Form.Control>
                  </>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupUserAgreement">
                <Form.Check
                  type="checkbox"
                  id="Uagreement"
                  name="Uagreement"
                  label={t('registrationPage.Uagreement')}
                  required
                  htmlFor="Uagreement"
                />
              </Form.Group>

              <Button type="submit">{t('registrationPage.button')}</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegistrationForm;
