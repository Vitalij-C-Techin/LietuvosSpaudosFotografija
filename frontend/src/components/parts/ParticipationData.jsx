import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col, Image, Modal, Form } from 'react-bootstrap';
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
  const [modalData, setModalData] = useState({ image: null, description: '' });
  const maxUploadsPerCategory = 3; // Maximum uploads per category

  const onDrop = (acceptedFiles) => {
    if (tempPhotos.filter(photo => photo.category === selectedCategory).length >= maxUploadsPerCategory) {
      // Alert the user or provide some indication that the limit has been reached
      alert(`Maximum uploads (${maxUploadsPerCategory}) reached for this category.`);
      return;
    }

    const newTempPhotos = acceptedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      category: selectedCategory,
      description: ''
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

  const handleImageClick = (imageUrl, description) => {
    setModalData({ image: imageUrl, description });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({ image: null, description: '' });
  };

  return (
    <Container className='participation-data-container'>
      <Row className="justify-content-center">
          <Col xs="12">
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
          </Col>
          <Card>
          <div {...getRootProps()} style={{ cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <Card.Img
              variant="top"
              src={tempPhotos.length > 0 ? tempPhotos[tempPhotos.length - 1].url : placeholderImage}
            />
          </div>
          <Card.Body>
            <Card.Title>{t('Description')}</Card.Title>
            <Card.Text>
            <Form.Control
              as="textarea"
              rows={3}
              value={tempPhotos.length > 0 ? tempPhotos[tempPhotos.length - 1].description : ''}
              onChange={(e) => {
                const newDescription = e.target.value;
                setTempPhotos(prevTempPhotos => {
                  const updatedTempPhotos = [...prevTempPhotos];
                  updatedTempPhotos[updatedTempPhotos.length - 1].description = newDescription;
                  return updatedTempPhotos;
                });
              }}
            />
            </Card.Text>
            <Row>
              <Col xs="12">
                <Button 
                  {...getRootProps()} 
                  variant="secondary" 
                  disabled={
                    tempPhotos.filter(photo => photo.category === selectedCategory).length >= maxUploadsPerCategory
                  }
                >
                  Upload
                </Button>
              </Col>
              <Col xs="12">
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
            <Image src={photo.url} thumbnail onClick={() => handleImageClick(photo.url, photo.description)} />
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData.image && <Image src={modalData.image} fluid />}
          <p>{modalData.description}</p>
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
