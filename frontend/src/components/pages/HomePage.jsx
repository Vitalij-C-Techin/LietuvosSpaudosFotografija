import Carousel from 'react-bootstrap/Carousel';
import firstSlideImage from '../../images/mike-petrucci-dI284PFy_pU-unsplash.jpg';
import secondSlideImage from '../../images/oskar-kadaksoo-MKh27bPCPGc-unsplash.jpg';
import thirdSlideImage from '../../images/patrick-tomasso-HM731qUoUas-unsplash.jpg';
import imagePlaceHolder from '../../images/image.jpg';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import '../../css/parts/home-page.scss';
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
      <Container>
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <h3 className="text-center">{t('layoutPage.imageHeaderText')}</h3>
            <div className="d-flex justify-content-center">
              <Image className="img-fluid" src={firstSlideImage} alt="First slide" rounded />
              <div className="position-absolute bottom-0 start-50 translate-middle-x">
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="btn-lg custom-button-width"
                    onClick={navigateToLoginPage}
                  >
                    Login
                  </Button>
                  <div className="custom-gap"></div>
                  <Button
                    variant="secondary"
                    className="btn-lg custom-button-width"
                    onClick={navigateToRegistrationPage}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <h3 className="text-center">{t('layoutPage.imageHeaderText')}</h3>
            <div className="d-flex justify-content-center">
              <Image className="img-fluid" src={secondSlideImage} alt="First slide" rounded />
              <div className="position-absolute bottom-0 start-50 translate-middle-x">
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="btn-lg custom-button-width"
                    onClick={navigateToLoginPage}
                  >
                    Login
                  </Button>
                  <div className="custom-gap"></div>
                  <Button
                    variant="secondary"
                    className="btn-lg custom-button-width"
                    onClick={navigateToRegistrationPage}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <h3 className="text-center">{t('layoutPage.imageHeaderText')}</h3>
            <div className="d-flex justify-content-center">
              <Image className="img-fluid" src={thirdSlideImage} alt="First slide" rounded />
              <div className="position-absolute bottom-0 start-50 translate-middle-x">
                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="btn-lg custom-button-width"
                    onClick={navigateToLoginPage}
                  >
                    Login
                  </Button>
                  <div className="custom-gap"></div>
                  <Button
                    variant="secondary"
                    className="btn-lg custom-button-width"
                    onClick={navigateToRegistrationPage}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>

        <div>
          <h3 className="contest">{t('homePage.constestListTitle')}:</h3>
        </div>
        <Card style={{ width: imageSize.width, maxWidth: '100%' }}>
          <Card.Body>
            <Row>
              <Col xs={6} md={4}>
                <Image src={imagePlaceHolder} rounded />
              </Col>
              <Col>
                <div>
                  <h5>{t('homePage.constestListTitle')}</h5>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card style={{ width: imageSize.width, maxWidth: '100%' }}>
          <Card.Body>
            <Row>
              <Col xs={6} md={4}>
                <Image src={imagePlaceHolder} rounded />
              </Col>
              <Col>
                <div>
                  <h5>{t('homePage.constestListTitle')}</h5>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        <Card style={{ width: imageSize.width, maxWidth: '100%' }}>
          <Card.Body>
            <Row>
              <Col xs={6} md={4}>
                <Image src={imagePlaceHolder} rounded />
              </Col>
              <Col>
                <div>
                  <h5>{t('homePage.constestListTitle')}</h5>
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default HomePage;
