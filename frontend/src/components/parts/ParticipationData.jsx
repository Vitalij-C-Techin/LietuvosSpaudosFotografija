import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

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
