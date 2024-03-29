import { useState, useRef, useEffect } from 'react';
import { Container, Image, Col, Row, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import imagePlaceHolder from '../../images/image.jpg';
import ImageGallery from 'react-image-gallery'; // Add this line
import 'react-image-gallery/styles/css/image-gallery.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Config from '../config/Config';
import LikeIcon from '../parts/thumbs-up-like-11260.png';
import Competition from '../utils/Competition';
import Photo from '../utils/Photo';

const CompetitionPage = () => {
  const { comp_uuid, category_uuid } = useParams();
  const { getUserData, getTokenHeader } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const token = getToken();
  const [images, setImages] = useState([]);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const juryId = getUserData().uuid;
  const [evaluationList, setEvaluationList] = useState([]);
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${Config.apiDomain}/api/v1/jury/${comp_uuid}/category/${category_uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const fetchedImages = response.data.map((image) => {
          return {
            imageId: image.uuid,
            original: `${Config.apiDomain}/photo/${image.uuid}.jpeg`,
            thumbnail: `${Config.apiDomain}/photo/${image.uuid}-small.jpeg`,
            description: lang === 'en' ? image.description_en : image.description_lt,
            description_lt: image.description_lt,
            description_en: image.description_en,
            name_lt: image.name_lt,
            name_en: image.name_en,
            submissionId: image.submission_id
          };
        });
        setImages(fetchedImages);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch data');
      })
      .finally(() => setLoading(false));
  }, [comp_uuid, category_uuid, token]);

  useEffect(() => {
    setLoading(true);

    let url = Config.apiDomain + Config.endpoints.jury.getSingle;
    url = url.replace('{uuid}', comp_uuid);

    const cfg = {
      headers: {
        ...(getTokenHeader() || {})
      }
    };

    axios
      .get(url, cfg)
      .then((response) => {
        console.log('Competition Info: ', response.data);
        const competitionInfo = {
          name_en: response.data.name_en,
          name_lt: response.data.name_lt,
          description_en: response.data.description_en,
          description_lt: response.data.description_lt,
          photo: `${Config.apiDomain}/photo/${response.data.image_uuid}-small.jpeg`
        };
        setCompetition(competitionInfo);
        console.log('here', competitionInfo);
      })
      .catch((error) => {
        console.error('Error: ', error);
        setCompetition(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchEvaluationList = () => {
    axios
      .get(`${Config.apiDomain}/api/v1/evaluation/jury/${juryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setEvaluationList(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch data');
      });
  };

  useEffect(() => {
    fetchEvaluationList();
  }, [token]);

  const onImageLike = (imageId, submissionId) => {
    axios
      .post(
        `${Config.apiDomain}/api/v1/evaluation`,
        {
          jury_uuid: juryId,
          liked: true,
          photo_uuid: imageId,
          submission_uuid: submissionId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        fetchEvaluationList();
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch data');
      });
  };

  const [showGallery, setShowGallery] = useState(false);
  const toggleFullScreenRef = useRef();
  const [clickedImageIndex, setClickedImageIndex] = useState(null);

  useEffect(() => {
    if (showGallery) {
      toggleFullScreenRef.current && toggleFullScreenRef.current.fullScreen();
    }
  }, [showGallery]);

  const handleScreenChange = (isFullScreen) => {
    if (!isFullScreen) {
      setShowGallery(false);
    }
  };

  const handleImageClick = (index) => {
    setShowGallery(true);
    setClickedImageIndex(index);
    setCurrentIndex(index);
  };

  const evaluationIds = evaluationList.map((item) => item.uuid);

  const renderCustomControls = () => {
    const handleButtonClick = () => {
      const currentIndex = toggleFullScreenRef.current.getCurrentIndex();
      onImageLike(images[currentIndex].imageId, images[currentIndex].submissionId);
      setClickedImageIndex(currentIndex);
    };
    return (
      <>
        {evaluationIds.includes(images[currentIndex].imageId) ? (
          <Button
            variant="outline-secondary"
            onClick={handleButtonClick}
            className="image-gallery-icon"
          >
            <Image src={LikeIcon} alt="My Icon" style={{ width: '20px', height: '20px' }} />
          </Button>
        ) : (
          <Button
            variant="outline-secondary"
            onClick={handleButtonClick}
            className="image-gallery-icon"
          >
            Like
          </Button>
        )}
      </>
    );
  };

  return (
    <Container className="competition-container my-2">
      <Container>
        <Row>
          <Col xxl="2" xl="2" lg="2" md="3" sm="3" className="d-flex justify-content-center">
            <Image src={competition.photo} rounded style={{ width: '100%', height: 'auto' }} />
          </Col>
          <Col>
            <h4>{lang === 'en' ? competition.description_en : competition.description_lt}</h4>
          </Col>
          <Col>{/* <h4>{c.getDescription()}</h4> */}</Col>
        </Row>
      </Container>
      <div className="divider"></div>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : null}
      <div>{error && <p>{error}</p>}</div>
      <Row className="mx-1">
        {images.map((image, index) => (
          <Col key={index} xl="2" className="my-3">
            <Card>
              <Card.Header>{lang === 'en' ? image.name_en : image.name_lt}</Card.Header>
              <Card.Img
                src={image.thumbnail}
                onClick={() => handleImageClick(index)}
                alt={image.name}
              />
              <Card body>
                <Card body>{lang === 'en' ? image.description_en : image.description_lt}</Card>
              </Card>
              <Button
                variant="outline-secondary"
                onClick={() => onImageLike(image.imageId, image.submissionId)}
              >
                {evaluationIds.includes(image.imageId) ? (
                  <Image src={LikeIcon} alt="My Icon" style={{ width: '20px', height: '20px' }} />
                ) : (
                  'Like'
                )}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      {showGallery && (
        <ImageGallery
          ref={toggleFullScreenRef}
          items={images}
          showPlayButton={true}
          showFullscreenButton={true}
          showThumbnails={false}
          showBullets={true}
          isFullscreen={true}
          startIndex={clickedImageIndex}
          onScreenChange={handleScreenChange}
          autoPlay={false}
          onSlide={setCurrentIndex}
          renderCustomControls={(currentIndex) => renderCustomControls(currentIndex)}
        />
      )}
    </Container>
  );
};

export default CompetitionPage;
