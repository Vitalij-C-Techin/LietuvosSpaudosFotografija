import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Container, Card, Col, Form, Row, Button} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {useTranslation} from 'react-i18next';
import {useForm} from "react-hook-form";

const LoginForm = (onLogin) => {
    const {t, i18n} = useTranslation();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const {
        register,
        handleSubmit,
        formState: {errors},
        clearErrors
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        },
        criteriaMode: 'firstError'
    });

    const navigateToRegistrationPage = () => {
        navigate('/registration');
    };

    const handleLoginSubmit = async (loginData) => {
        const {email, password} = loginData;

        if (!email || !password) {
            setError(t('loginPage.noUser'));
            return;
        }

        login(email, password, {
            then: (response) => {
                navigate('/profile');
            },
            catch: (error) => {
                if (error.response && error.response.status === 401) {
                    setError(t('loginPage.invalidCredentials'));
                } else {
                    setError(t('loginPage.loginFail'));
                }
            }
        });
    };

    useEffect(() => {
        clearErrors();
        setError("");
    }, [i18n.language, clearErrors]);

    return (
        <>
            <Container className="form-container justify-content-md-center">
                <Row className="justify-content-md-center">
                    <Col xs="12" sm="8" md="6" lg="4">
                        <Card className="my-5">
                            <h2 style={{textAlign: 'center'}} data-testid="form-title">{t('loginPage.title')}</h2>
                        </Card>
                        <Form noValidate onSubmit={handleSubmit(handleLoginSubmit)}>
                            {error && <p style={{color: 'red'}}>{error}</p>}
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>{t('loginPage.email')}</Form.Label>
                                <Form.Control
                                    data-testid="email-input"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="example@example.com"
                                    {...register('email', {required: t('loginPage.required')})}
                                />
                                {errors.email && (
                                    <Form.Text className="text-danger"
                                               data-testid="email-error">{errors.email.message}</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>{t('loginPage.password')}</Form.Label>
                                <Form.Control
                                    data-testid="password-input"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder={t('loginPage.passwordPlaceholder')}
                                    {...register('password', {required: t('loginPage.required')})}
                                />
                                {errors.password && (
                                    <Form.Text className="text-danger"
                                               data-testid="password-error">{errors.password.message}</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formGroupLinks">
                                <Row className="align-items-center">
                                    <Link to="/forgot-password">{t('loginPage.forgotPassword')}</Link>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGroupButton">
                                <Row className="align-items-center">
                                    <Col className="mt-3" xs={12} md={6}>
                                        <Button variant="light" type="submit"
                                                data-testid="login-button">
                                            {t('loginPage.login')}
                                        </Button>
                                    </Col>

                                    <Col className="mt-3" xs={12} md={6}>
                                        <Button variant="light" type="button" onClick={navigateToRegistrationPage}>
                                            {t('loginPage.register')}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginForm;
