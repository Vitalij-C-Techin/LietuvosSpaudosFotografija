import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {Container, Card, Col, Form, Row, Button} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {useTranslation} from 'react-i18next';
import {useForm} from "react-hook-form";

const LoginForm = (onLogin) => {
    const {t} = useTranslation();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login, setUser} = useAuth();

    const {
        register,
        handleSubmit,
        formState: {errors}
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

    return (
        <>
            <Container className="form-container justify-content-md-center">
                <Row className="justify-content-md-center">
                    <Col xs="12" sm="8" md="6" lg="4">
                        <Card className="my-5">
                            <h2 style={{textAlign: 'center'}}>{t('loginPage.title')}</h2>

                        </Card>

                        <Form onSubmit={handleSubmit(handleLoginSubmit)}>
                            {error && <p style={{color: 'red'}}>{error}</p>}
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>{t('loginPage.email')}</Form.Label>
                                <Form.Control
                                    type="email"
                                    autoComplete="email"
                                    placeholder="egzamle@egzample.com"
                                    {...register('email', {required: t('loginPage.required')})}
                                />
                                {errors.email && (
                                    <Form.Text className="text-danger">{errors.email.message}</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>{t('loginPage.password')}</Form.Label>
                                <Form.Control
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder={t('loginPage.passwordPlaceholder')}
                                    {...register('password', {required: t('loginPage.required')})}
                                />
                                {errors.password && (
                                    <Form.Text className="text-danger">{errors.password.message}</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formGroupLinks">
                                <Row className="align-items-center">
                                    <Link to="/forgotpassword">{t('loginPage.forgotPassword')}</Link>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGroupButton">
                                <Row className="align-items-center">
                                    <Col className="mt-3" xs={12} md={6}>
                                        <Button variant="light" data-testid="login" type="submit">
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
