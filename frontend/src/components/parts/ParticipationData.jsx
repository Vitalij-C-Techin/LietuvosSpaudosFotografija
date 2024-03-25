import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const ParticipationData = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newPhotos = acceptedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <Container>
      <Row className="justify-content-center">
        <Card style={{ width: '18rem' }}>
          <DropdownButton variant="secondary" id="dropdown-item-button" title="Categories">
            <Dropdown.Item as="button">Category1</Dropdown.Item>
            <Dropdown.Item as="button">Category2</Dropdown.Item>
            <Dropdown.Item as="button">Category3</Dropdown.Item>
          </DropdownButton>
          <div {...getRootProps()} style={{ cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <Card.Img
              variant="top"
              src={photos.length > 0 ? photos[photos.length - 1].url : 'holder.js/100px180'}
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
                <Button variant="secondary">Submit</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row className="mt-3 justify-content-center">
        {photos.map((photo, index) => (
          <Col key={index} className="mb-3" xs={6} md={4} lg={3}>
            <Image src={photo.url} thumbnail />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ParticipationData;
