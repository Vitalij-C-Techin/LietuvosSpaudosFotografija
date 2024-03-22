import { useState, useRef, useEffect } from 'react';
import { Container, Image, Col, Row, Card, Pagination, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import imagePlaceHolder from '../../images/image.jpg';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const CompetitionPage = () => {
  const [images, setImages] = useState([
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      description: '1',
      isLiked: false
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '2',
      isLiked: true
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      description: '3',
      isLiked: false
    },
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      description: '4',
      isLiked: false
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '5',
      isLiked: false
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '6',
      isLiked: true
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '7',
      isLiked: true
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '8',
      isLiked: false
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '9',
      isLiked: true
    }
  ]);

  const { t } = useTranslation();
  const { getUserData } = useAuth();
  const juryId = getUserData().uuid;

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
      <Row className="mx-1">
        {images.map((image, index) => (
          <Col key={index} xl="4" className="my-3">
            <Card>
              <Card.Img thumbnail src={image.original} onClick={() => handleImageClick(index)} />
              {/* <Image
                src={image.original}
                rounded
                style={{ width: '100%', height: 'auto' }}
                onClick={() => handleImageClick(index)}
              /> */}
              <Card body>
                <Card body>This is some text within a card body.</Card>
              </Card>
              <Button variant="outline-light">
                {' '}
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
