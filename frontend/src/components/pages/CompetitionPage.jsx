import { useState, useRef, useEffect } from 'react';
import { Container, Image, Col, Row, Card, Pagination, Button } from 'react-bootstrap';
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
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '6'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '4'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '5'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      description: '6'
    }
  ];
  const [showGallery, setShowGallery] = useState(false);
  const toggleFullScreenRef = useRef();
  const [clickedImageIndex, setClickedImageIndex] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(images.length / itemsPerPage);

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

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const getPaginatedImages = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return images.slice(startIndex, endIndex);
  };

  const renderCustomControls = () => {
    const handleButtonClick = () => {
      console.log('Custom button clicked!');
    };

    return (
      <div
        className="custom-controls-container"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Button variant="primary" onClick={handleButtonClick}>
          Custom Button
        </Button>
      </div>
    );
  };

  return (
    <Container className="competition-container my-2">
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
      <Row className="mx-1">
        {getPaginatedImages().map((image, index) => (
          <Col key={index} xl="4" className="my-3">
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
          renderCustomControls={renderCustomControls}
        />
      )}

      <Pagination className="mt-3 justify-content-center custom-pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={activePage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default CompetitionPage;
