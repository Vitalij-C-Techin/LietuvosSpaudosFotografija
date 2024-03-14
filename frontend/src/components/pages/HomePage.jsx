import Carousel from 'react-bootstrap/Carousel';
import firstSlideImage from '../../images/mike-petrucci-dI284PFy_pU-unsplash.jpg';
import secondSlideImage from '../../images/oskar-kadaksoo-MKh27bPCPGc-unsplash.jpg';
import thirdSlideImage from '../../images/patrick-tomasso-HM731qUoUas-unsplash.jpg';
import imagePlaceHolder from '../../images/image.jpg';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { Image, Container, Card, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import Config from '../config/Config';
import axios from 'axios';
import Competition from '../utils/Competition';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getUserData, getTokenHeader } = useAuth();

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const [competitions, setCompetitions] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

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

  useEffect(() => {
    setIsLoading(true);

    let url = Config.apiDomain + Config.endpoints.competitions.active;
    url = url.replace('{page}', 0);

    axios
      .get(url)
      .then((response) => {
        if (!response.data.empty) {
          setCompetitions(response.data.content);

          return;
        }

        setCompetitions(null);
      })
      .catch((error) => {
        console.error('Error: ', error);

        setCompetitions(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
                variant="secondary"
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

        {!!!isLoading && !!competitions && (
          <CompetitionList competitions={competitions} imageSize={imageSize} />
        )}
      </Container>
    </>
  );
}

const CompetitionList = ({ competitions, imageSize }) => {
  const { t } = useTranslation();

  const list = competitions.map((competition, i) => {
    return <CompetitionSignle competition={competition} imageSize={imageSize} key={i} />;
  });

  return (
    <>
      <Card className="py-5">
        <h3 className="contest">{t('homePage.constestListTitle')}</h3>
        <div className="divider"></div>
      </Card>

      {list}
    </>
  );
};

const CompetitionSignle = ({ competition, imageSize }) => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const c = new Competition(competition);

  const onParticipate = () => {
    if (isLoggedIn()) {
      navigate('/user-competition-request');

      return;
    }

    navigate('/login');
  };

  return (
    <Card className="contest-card mb-3" style={{ width: imageSize.width, maxWidth: '100%' }}>
      <Card.Body>
        <Row className="justify-content-center">
          <Col xs="" md={4} lg={2} className="card-image-container">
            <Image src={imagePlaceHolder} />
          </Col>
          <Col>
            <Card.Title>{c.getName()}</Card.Title>
            <Card.Text>{c.getDescription()}</Card.Text>
            <Row className="justify-content-center">
              <Col xs="12" lg="10">
                <Card.Text className="pe-3 competition-end">
                  {t('loginPage.competitionEnd')} {c.getEndDate()}
                </Card.Text>
              </Col>
              <Col xs="12" lg="2">
                <Button variant="secondary" className="mt-2" onClick={onParticipate}>
                  {t('loginPage.participate')}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default HomePage;
