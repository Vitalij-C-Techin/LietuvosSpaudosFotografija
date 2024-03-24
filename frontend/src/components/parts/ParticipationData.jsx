import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ParticipationData = () => {
  const { t } = useTranslation();
  const [photo, setPhoto] = useState(null);

  const onDrop = (acceptedFiles) => {
    setPhoto(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <Container>
      <Row className="justify-content-center">
        <Card style={{ width: '18rem' }}>
          <DropdownButton id="dropdown-item-button" title="Categories">
            <Dropdown.Item as="button">Category1</Dropdown.Item>
            <Dropdown.Item as="button">Category2</Dropdown.Item>
            <Dropdown.Item as="button">Category3</Dropdown.Item>
          </DropdownButton>
          <div {...getRootProps()} style={{ cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <Card.Img
              variant="top"
              src={photo ? URL.createObjectURL(photo) : 'holder.js/100px180'}
            />
          </div>
          <Card.Body>
            <Card.Title>{t('Card Title')}</Card.Title>
            <Card.Text>
              {t(
                "Some quick example text to build on the card title and make up the bulk of the card's content."
              )}
            </Card.Text>
            <Button {...getRootProps()} variant="primary">
              Upload
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ParticipationData;
