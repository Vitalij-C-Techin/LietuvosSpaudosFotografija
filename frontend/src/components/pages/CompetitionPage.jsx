import { useState, useRef, useEffect } from 'react';
import { Container, Image, Col, Row, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import imagePlaceHolder from '../../images/image.jpg';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const CompetitionPage = () => {
  const { t } = useTranslation();
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      description: '1'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '2'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      description: '3'
    },
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      description: '4'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '5'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      description: '6'
    }
  ];
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
  };

  return (
    <Container className="competition-container">
      <Container>
        <Row>
          <Col xxl="2" xl="2" lg="2" md="3" sm="3" className="d-flex justify-content-center">
            <Image
              src={imagePlaceHolder}
              rounded
              style={{ width: '100%', height: 'auto' }}
              onClick={handleImageClick}
            />
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
      <Row>
        {images.map((image, index) => (
          <Col key={index}>
            <Card>
              <Image
                src={image.original}
                rounded
                style={{ width: '100%', height: 'auto' }}
                onClick={() => handleImageClick(index)}
              />
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
        />
      )}
    </Container>
  );
};

export default CompetitionPage;
