import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col, Image, Modal } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

// Placeholder image URL
const placeholderImage = 'https://content.hostgator.com/img/weebly_image_sample.png';

const ParticipationData = () => {
  const { t } = useTranslation();
  const [tempPhotos, setTempPhotos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const newTempPhotos = acceptedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      category: selectedCategory
    }));
    setTempPhotos(prevTempPhotos => [...prevTempPhotos, ...newTempPhotos]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = () => {
    const photosToAdd = tempPhotos.filter(photo => photo.category === selectedCategory);
    setPhotos(prevPhotos => [...prevPhotos, ...photosToAdd]);
    setTempPhotos([]);
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Card style={{ width: '18rem' }}>
          <DropdownButton variant="secondary" id="dropdown-item-button" title={selectedCategory || "Categories"}>
            <Dropdown.Item as="button" onClick={() => handleCategorySelect('Category1')}>
              Category1
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleCategorySelect('Category2')}>
              Category2
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleCategorySelect('Category3')}>
              Category3
            </Dropdown.Item>
          </DropdownButton>
          <div {...getRootProps()} style={{ cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <Card.Img
              variant="top"
              src={tempPhotos.length > 0 ? tempPhotos[tempPhotos.length - 1].url : placeholderImage}
            />
          </div>
          <Card.Body>
            <Card.Title>{t('Card Title')}</Card.Title>
            <Card.Text>
              {t(
                "Some quick example text to build on the card title and make up the bulk of the card's content."
              )}
            </Card.Text>
            <Row>
              <Col>
                <Button {...getRootProps()} variant="secondary">
                  Upload
                </Button>
              </Col>
              <Col>
                <Button variant="secondary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mt-3 justify-content-center">
        {selectedCategory && photos.filter(photo => photo.category === selectedCategory).map((photo, index) => (
          <Col key={index} className="mb-3" xs={6} md={4} lg={3}>
            <Image src={photo.url} thumbnail onClick={() => handleImageClick(photo.url)} />
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalImage && <Image src={modalImage} fluid />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ParticipationData;
