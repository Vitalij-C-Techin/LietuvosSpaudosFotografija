import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Container, Card, Col, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { isValidPhoneNumber } from 'react-phone-number-input';

//TODO check layout after more work is done
//TODO check console.log if any left

const RegistrationForm = () => {
  const { t } = useTranslation();
  const [selectedActivity, setSelectedActivity] = useState(``);
  const [emailError, setEmailError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      surname: '',
      birthYear: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      mediaName: ''
    },
    criteriaMode: 'all'
  });

  const password = watch('password');

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/register', formData);
      alert(t('registrationPage.registerSuccessuful'));
      window.location.href = '/login';
    } catch (error) {
      if (error.response.status === 400) {
        setEmailError(t('registrationPage.emailError'));
      }
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
            <Form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">{t('registrationPage.name')}</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      placeholder={t('registrationPage.namePlaceholder')}
                      {...register('name', {
                        required: t('registrationPage.required'),
                        minLength: {
                          value: 3,
                          message: t('registrationPage.nameMinLegth')
                        },
                        maxLength: {
                          value: 20,
                          message: t('registrationPage.nameMaxLegth')
                        },
                        pattern: {
                          value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/,
                          message: t('registrationPage.namePattern')
                        }
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="name"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-danger mb-1 " style={{ fontSize: '14px' }} key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="surname">{t('registrationPage.surname')}</Form.Label>

                    <Form.Control
                      type="text"
                      name="surname"
                      id="surname"
                      placeholder={t('registrationPage.surnamePlaceholder')}
                      {...register('surname', {
                        required: t('registrationPage.required'),
                        minLength: {
                          value: 3,
                          message: t('registrationPage.surnameMinLegth')
                        },
                        maxLength: {
                          value: 20,
                          message: t('registrationPage.surnameMaxLegth')
                        },
                        pattern: {
                          value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/,
                          message: t('registrationPage.surnamePattern')
                        }
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="surname"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-danger mb-1" style={{ fontSize: '14px' }} key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">{t('registrationPage.email')}</Form.Label>

                <Form.Control
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  autoComplete="email"
                  {...register('email', {
                    required: t('registrationPage.required'),
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: t('registrationPage.emailPattern')
                    }
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p className="text-danger mb-1" style={{ fontSize: '14px' }} key={type}>
                        {message}
                      </p>
                    ))
                  }
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">{t('registrationPage.password')}</Form.Label>

                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      placeholder={t('registrationPage.passwordPlaceholder')}
                      autoComplete="new-password"
                      {...register('password', {
                        required: t('registrationPage.required'),
                        minLength: {
                          value: 8,
                          message: t('registrationPage.passwordMinLength')
                        },
                        maxLength: {
                          value: 50,
                          message: t('registrationPage.passwordMaxLength')
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).$/,
                          message: t('registrationPage.passwordPattern')
                        }
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-danger mb-1" style={{ fontSize: '14px' }} key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="confirmPassword">
                      {t('registrationPage.confirmPassword')}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder={t('registrationPage.cpasswordPlaceholder')}
                      autoComplete="new-password"
                      {...register('confirmPassword', {
                        required: t('registrationPage.required'),
                        validate: (value) =>
                          value === password || t('registrationPage.passwordMatch')
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="confirmPassword"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-danger" style={{ fontSize: '14px' }} key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md="6" lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="birthYear">{t('registrationPage.byear')}</Form.Label>

                    <Form.Control
                      type="number"
                      name="birthYear"
                      id="birthYear"
                      placeholder={t('registrationPage.byearPlaceholder')}
                      {...register('birthYear', {
                        required: t('registrationPage.required'),
                        max: {
                          value: new Date().getFullYear() - 18,
                          message: t('registrationPage.birthYearMax')
                        },
                        min: {
                          value: new Date().getFullYear() - 100,
                          message: t('registrationPage.birthYearMin')
                        }
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="birthYear"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-danger" style={{ fontSize: '14px' }} key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md="6" lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="phoneNumber">
                      {t('registrationPage.phoneNumber')}
                    </Form.Label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{
                        validate: (value) =>
                          isValidPhoneNumber(`${value}`) || t('registrationPage.phoneError'),
                        required: t('registrationPage.required')
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          value={value}
                          onChange={onChange}
                          defaultCountry="LT"
                          international
                          id="phoneNumber"
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="phoneNumber"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-danger mx-5" style={{ fontSize: '14px' }} key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
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
                    <Form.Label htmlFor="mediaName" className="mt-3 ">
                      {t('registrationPage.mediaName')}
                    </Form.Label>
                    <Form.Control
                      id="mediaName"
                      as="textarea"
                      {...register('mediaName', {
                        required: t('registrationPage.required'),
                        minLength: {
                          value: 2,
                          message: t('registrationPage.mediaNameMinLength')
                        },
                        maxLength: {
                          value: 50,
                          message: t('registrationPage.mediaNameMaxLength')
                        }
                      })}
                    ></Form.Control>
                    <ErrorMessage
                      errors={errors}
                      name="mediaName"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p className="text-danger" style={{ fontSize: '14px' }} key={type}>
                            {message}
                          </p>
                        ))
                      }
                    />
                  </>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="Uagreement"
                  name="Uagreement"
                  label={t('registrationPage.Uagreement')}
                  htmlFor="Uagreement"
                  {...register('Uagreement', { required: t('registrationPage.required') })}
                />
                {errors.Uagreement && (
                  <Form.Text className="text-danger">{errors.Uagreement.message}</Form.Text>
                )}
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
