import Carousel from 'react-bootstrap/Carousel';
import firstSlideImage from '../../images/mike-petrucci-dI284PFy_pU-unsplash.jpg';
import secondSlideImage from '../../images/oskar-kadaksoo-MKh27bPCPGc-unsplash.jpg';
import thirdSlideImage from '../../images/patrick-tomasso-HM731qUoUas-unsplash.jpg';
import imagePlaceHolder from '../../images/image.jpg';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { Image, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { t } = useTranslation();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const navigate = useNavigate();
  const navigateToRegistrationPage = () => {
    navigate('/registration');
  };
  const navigateToLoginPage = () => {
    navigate('/login');
  };

  useEffect(() => {
    const image = new window.Image();
    image.src = firstSlideImage;
    image.onload = () => {
      setImageSize({ width: image.naturalWidth, height: image.naturalHeight });
    };
  }, []);

  return (
    <>
      <Container className="pb-5">
        <Card className="image-header-text">
          <h3>{t('layoutPage.imageHeaderText')}</h3>
        </Card>
        <Carousel className="carousel-container">
          <Carousel.Item>
            <div className="d-flex justify-content-center">
              <Image className="img-fluid" src={firstSlideImage} alt="First slide" />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="d-flex justify-content-center">
              <Image className="img-fluid" src={secondSlideImage} alt="First slide" />
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="d-flex justify-content-center">
              <Image className="img-fluid" src={thirdSlideImage} alt="First slide" />
            </div>
          </Carousel.Item>
        </Carousel>
        <Card className="carousel-buttons">
          <Row className="justify-content-center">
            <Col xs="12" sm="10" md="8" lg="2">
              <Button
                variant="primary"
                className="btn-lg custom-button-width"
                onClick={navigateToLoginPage}
              >
                 {t('loginPage.login')}
              </Button>
            </Col>
            <Col lg="2"></Col>
            <Col xs="12" sm="10" md="8" lg="2">
              <Button
                variant="secondary"
                className="btn-lg custom-button-width"
                onClick={navigateToRegistrationPage}
              >
                 {t('loginPage.register')}
              </Button>
            </Col>
          </Row>
        </Card>

        <Card className="py-5">
          <h3 className="contest">{t('homePage.constestListTitle')}</h3>
          <div className="divider"></div>
        </Card>

        <Card className="contest-card" style={{ width: imageSize.width, maxWidth: '100%' }}>
          <Card.Body>
            <Row className="justify-content-center">
              <Col xs="" md={4} lg={2} className="card-image-container">
                <Image src={imagePlaceHolder} />
              </Col>
              <Col>
                <Card.Title className="mt-5">COMPETITION TITLE</Card.Title>
                <Card.Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum."
                </Card.Text>
                <Row className="justify-content-center">
                  <Col xs="12" lg="10">
                    <Card.Text className="pe-3 competition-end">Competition ends in:</Card.Text>
                  </Col>
                  <Col xs="12" lg="2">
                    {' '}
                    <Button className="mt-2">PARTICIPATE</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="contest-card" style={{ width: imageSize.width, maxWidth: '100%' }}>
          <Card.Body>
            <Row>
              <Col
                xs=""
                md={4}
                lg={2}
                className="card-image-container justify-content-center"
              >
                <Image src={imagePlaceHolder} />
              </Col>
              <Col>
                <Card.Title className="mt-5">COMPETITION TITLE</Card.Title>
                <Card.Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum."
                </Card.Text>
                <Row className="justify-content-center">
                  <Col xs="12" lg="10">
                    <Card.Text className="pe-3 competition-end">Competition ends in:</Card.Text>
                  </Col>
                  <Col xs="12" lg="2">
                    {' '}
                    <Button className="mt-2">PARTICIPATE</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="contest-card" style={{ width: imageSize.width, maxWidth: '100%' }}>
          <Card.Body>
            <Row className="justify-content-center">
              <Col xs="12" md={4} lg={2} className="card-image-container">
                <Image src={imagePlaceHolder} />
              </Col>
              <Col>
                <Card.Title className="mt-5">COMPETITION TITLE</Card.Title>
                <Card.Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum."
                </Card.Text>
                <Row className="justify-content-center">
                  <Col xs="12" lg="10">
                    <Card.Text className="pe-3 competition-end">Competition ends in:</Card.Text>
                  </Col>
                  <Col xs="12" lg="2">
                    {' '}
                    <Button className="mt-2">PARTICIPATE</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default HomePage;
