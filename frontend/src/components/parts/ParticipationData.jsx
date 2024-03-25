import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const ParticipationData = () => {
  const { t } = useTranslation();
  const [tempPhotos, setTempPhotos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
              src={tempPhotos.length > 0 ? tempPhotos[tempPhotos.length - 1].url : 'holder.js/100px180'}
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
            <Image src={photo.url} thumbnail />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ParticipationData;
