import { useState, useRef, useEffect } from 'react';
import { Container, Image, Col, Row, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import imagePlaceHolder from '../../images/image.jpg';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Config from '../config/Config';

const CompetitionPage = () => {
  const { comp_uuid, category_uuid } = useParams();
  const { getUserData } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const token = getToken();
  const [images, setImages] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const juryId = getUserData().uuid;

  console.log('Current Language:', lang);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${Config.apiDomain}/api/v1/competition/${comp_uuid}/category/${category_uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const fetchedImages = response.data.map((image) => {
          return {
            original: `${Config.apiDomain}/photo/${image.uuid}.jpeg`,
            thumbnail: `${Config.apiDomain}/photo/${image.uuid}-small.jpeg`,
            description_lt: image.description_lt,
            description_en: image.description_en,
            name_lt: image.name_lt,
            name_en: image.name_en,
            submissionId: image.uuid
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const onImageLike = (imageId) => {
    console.log(juryId);
    console.log('Image liked', imageId, images[imageId].isLiked);
    const liked = true;
    const submissionId = imageId;
    const updatedImages = images.map((image, index) => {
      if (index === imageId) {
        return { ...image, isLiked: true };
      }
      return image;
    });
    setImages(updatedImages);
    axios
      .post('http://localhost:8080/api/v1/evaluation', { juryId, liked, submissionId })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showGallery, setShowGallery] = useState(false);
  const toggleFullScreenRef = useRef();
  const [clickedImageIndex, setClickedImageIndex] = useState(null);

  useEffect(() => {
    if (showGallery) {
      console.log('now here');
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

  const renderCustomControls = () => {
    const handleButtonClick = () => {
      const currentIndex = toggleFullScreenRef.current.getCurrentIndex();
      onImageLike(currentIndex);
      console.log('Custom button clicked!', currentIndex);
    };

    return (
      <>
        {images[currentIndex].isLiked ? (
          <Button
            variant="outline-secondary"
            onClick={handleButtonClick}
            className="image-gallery-icon"
          >
            👍
          </Button>
        ) : (
          <Button
            variant="outline-secondary"
            onClick={handleButtonClick}
            className="image-gallery-icon"
          >
            no likes
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
            <Image src={imagePlaceHolder} rounded style={{ width: '100%', height: 'auto' }} />
          </Col>

          <Col>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut facilis nihil aut
              laudantium id fuga iure exercitationem qui enim optio culpa aperiam debitis modi quis
              cumque non, illo cum!
            </h4>
          </Col>
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
                thumbnail
                src={image.thumbnail}
                onClick={() => handleImageClick(index)}
                alt={image.name}
              />
              <Card body>
                <Card body>{lang === 'en' ? image.description_en : image.description_lt}</Card>
              </Card>
              <Button variant="outline-light">
                <Card.Text>
                  <span role="img" aria-label="like">
                    👍
                  </span>
                </Card.Text>
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
