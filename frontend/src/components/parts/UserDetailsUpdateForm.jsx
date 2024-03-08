import { useEffect, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from 'react-router-dom';
import { Authentication, IsAuthenticated, IsNotAuthenticated } from '../utils/Authentication';
import { useAuth } from '../context/AuthContext';

const UserDetailsUpdateForm = () => {
  const { t, i18n } = useTranslation();
  const [selectedActivity, setSelectedActivity] = useState(``);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { getUserData, isLoggedIn, getToken } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      name: getUserData().name,
      surname: getUserData().surname,
      birth_year: getUserData().birth_year,
      phone_number: getUserData().phone_number,
      email: getUserData().email,
      media_name: getUserData().media_name
    },
    criteriaMode: 'all'
  });

  const handleFormSubmit = (formData) => {
    const token = getToken();
    axios
      .put(`http://localhost:8080/api/v1/user/${getUserData().uuid}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        alert('User details updated');
      })
      .catch((error) => {});
  };
  const handleChangeActivity = (e) => {
    setSelectedActivity(e.target.value);
  };

  useEffect(() => {
    clearErrors();
    setEmailError('');
  }, [i18n.language, clearErrors]);

  return (
    <>
      <Container className="registration-form-container mb-5">
        <Row className="justify-content-md-center">
          <Col xs="12" sm="10" md="8" lg="6">
            <Card className="my-5">
              <h2 data-testid="form-title" style={{ textAlign: 'center' }}>
                {t('User details form')}
              </h2>
            </Card>
            <IsNotAuthenticated>
              <>
                <p>{t('Not logged in')}</p>
              </>
            </IsNotAuthenticated>
            <IsAuthenticated>
              <p>{!!getUserData() && getUserData().uuid}</p>
              <Form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                <Row>
                  <Col xs="12" sm="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="name">{t('registrationPage.name')}</Form.Label>
                      <Form.Control
                        data-testid="name-input"
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        placeholder={t('registrationPage.namePlaceholder')}
                        {...register('name', {
                          required: t('registrationPage.required'),
                          minLength: {
                            value: 2,
                            message: t('registrationPage.nameMinLength')
                          },
                          maxLength: {
                            value: 50,
                            message: t('registrationPage.nameMaxLength')
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
                            <p
                              className="text-danger mb-1 "
                              style={{ fontSize: '14px' }}
                              key={type}
                            >
                              {message}
                            </p>
                          ))
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="12" sm="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="surname">{t('registrationPage.surname')}</Form.Label>

                      <Form.Control
                        data-testid="surname-input"
                        type="text"
                        name="surname"
                        id="surname"
                        placeholder={t('registrationPage.surnamePlaceholder')}
                        {...register('surname', {
                          required: t('registrationPage.required'),
                          minLength: {
                            value: 2,
                            message: t('registrationPage.surnameMinLength')
                          },
                          maxLength: {
                            value: 50,
                            message: t('registrationPage.surnameMaxLength')
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
                    data-testid="email-input"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    autoComplete="email"
                    {...register('email', {
                      required: t('registrationPage.required'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="birth_year">
                        {t('registrationPage.birthYear')}
                      </Form.Label>

                      <Form.Control
                        data-testid="birth-year-input"
                        type="number"
                        name="birth_year"
                        id="birth_year"
                        placeholder={t('registrationPage.birthYearPlaceholder')}
                        {...register('birth_year', {
                          required: t('registrationPage.required'),
                          maxLength: {
                            value: 4,
                            message: t('registrationPage.birthYearLength')
                          },
                          minLength: {
                            value: 4,
                            message: t('registrationPage.birthYearLength')
                          },
                          max: {
                            value: new Date().getFullYear() - 18,
                            message: t('registrationPage.birthYearMax')
                          },
                          min: {
                            value: new Date().getFullYear() - 120,
                            message: t('registrationPage.birthYearMin')
                          }
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="birth_year"
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
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="phone_number">
                        {t('registrationPage.phoneNumber')}
                      </Form.Label>
                      <Controller
                        name="phone_number"
                        control={control}
                        rules={{
                          validate: (value) =>
                            isValidPhoneNumber(`${value}`) || t('registrationPage.phoneError'),
                          required: t('registrationPage.required')
                        }}
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            data-testid="phone-input"
                            value={value}
                            onChange={onChange}
                            defaultCountry="LT"
                            international
                            id="phone_number"
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="phone_number"
                        render={({ messages }) =>
                          messages &&
                          Object.entries(messages).map(([type, message]) => (
                            <p
                              className="text-danger mx-5 mb-1 "
                              style={{ fontSize: '14px' }}
                              key={type}
                            >
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
                    data-testid="activity-input"
                    name="activity"
                    id="activity"
                    size={1}
                    value={selectedActivity}
                    onChange={handleChangeActivity}
                  >
                    <option value="freelanceWorker">{t('registrationPage.work1')}</option>
                    <option value="mediaWorker">{t('registrationPage.work2')}</option>
                  </Form.Select>

                  {selectedActivity === 'mediaWorker' && (
                    <>
                      <Form.Label htmlFor="media_name" className="mt-3">
                        {t('registrationPage.mediaName')}
                      </Form.Label>
                      <Form.Control
                        data-testid="media-name-input"
                        id="media_name"
                        as="textarea"
                        {...register('media_name', {
                          required: t('registrationPage.required'),
                          maxLength: {
                            value: 50,
                            message: t('registrationPage.mediaNameMaxLength')
                          }
                        })}
                      ></Form.Control>
                      <ErrorMessage
                        errors={errors}
                        name="media_name"
                        render={({ messages }) =>
                          messages &&
                          Object.entries(messages).map(([type, message]) => (
                            <p className="text-danger mb-1" style={{ fontSize: '14px' }} key={type}>
                              {message}
                            </p>
                          ))
                        }
                      />
                    </>
                  )}
                </Form.Group>
                <Button variant="secondary" type="submit" data-testid="submit-button">
                  {t('registrationPage.button')}
                </Button>
              </Form>
            </IsAuthenticated>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDetailsUpdateForm;
