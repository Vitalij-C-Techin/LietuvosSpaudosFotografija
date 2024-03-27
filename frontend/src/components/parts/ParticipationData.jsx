import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Container, Row, Col, Image, Modal, Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Config from '../config/Config';
// Placeholder image URL
const placeholderImage = 'https://content.hostgator.com/img/weebly_image_sample.png';

const ParticipationData = () => {
  const { t, i18n } = useTranslation();
  const { getTokenHeader } = useAuth();
  const [tempPhotos, setTempPhotos] = useState({});
  const [photos, setPhotos] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ image: null, description: '' });
  const maxUploadsPerCategory = 3; // Maximum uploads per category
  const maxTotalUploads = 9; // Maximum total uploads across all categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Clear temp photos when category changes
    setTempPhotos({});
  }, [selectedCategory]);

  const onDrop = (acceptedFiles) => {
    if (!selectedCategory) {
      alert('Please select a category.');
      return;
    }

    if ((tempPhotos[selectedCategory]?.length || 0) >= maxUploadsPerCategory) {
      alert(`Maximum uploads (${maxUploadsPerCategory}) reached for this category.`);
      return;
    }

    if (
      Object.keys(tempPhotos).reduce(
        (total, category) => total + (tempPhotos[category]?.length || 0),
        0
      ) >= maxTotalUploads
    ) {
      alert(`Maximum total uploads (${maxTotalUploads}) reached.`);
      return;
    }

    const newTempPhotos = acceptedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      description: ''
    }));
    setTempPhotos((prevTempPhotos) => ({
      ...prevTempPhotos,
      [selectedCategory]: [...(prevTempPhotos[selectedCategory] || []), ...newTempPhotos]
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/api/v1/category/`
  //       );
  //       console.log('Fetched categories:', response.data);
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  useEffect(() => {
    let url = Config.apiDomain + Config.endpoints.competitions.edit;
    url = url.replace('{uuid}', '04b54a6c-cd59-4c48-8329-0af2610621b8');

    axios
      .get(url, {
        headers: getTokenHeader()
      })
      .then((response) => {
        console.log(response.data.data.category_list);
        setCategories(response.data.data.category_list);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = () => {
    const photosToAdd = tempPhotos[selectedCategory] || [];
    if ((photos[selectedCategory]?.length || 0) + photosToAdd.length > maxUploadsPerCategory) {
      alert(`Maximum uploads (${maxUploadsPerCategory}) reached for this category.`);
      return;
    }
    setPhotos((prevPhotos) => ({
      ...prevPhotos,
      [selectedCategory]: [...(prevPhotos[selectedCategory] || []), ...photosToAdd]
    }));
    setTempPhotos((prevTempPhotos) => {
      const newTempPhotos = { ...prevTempPhotos };
      delete newTempPhotos[selectedCategory];
      return newTempPhotos;
    });
  };

  const handleImageClick = (imageUrl, description) => {
    setModalData({ image: imageUrl, description });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({ image: null, description: '' });
  };

  const removePhoto = (category, index, isTempPhoto) => {
    if (isTempPhoto) {
      const updatedTempPhotos = { ...tempPhotos };
      updatedTempPhotos[category] = tempPhotos[category].filter((_, i) => i !== index);
      setTempPhotos(updatedTempPhotos);
    } else {
      const updatedPhotos = { ...photos };
      updatedPhotos[category] = photos[category].filter((_, i) => i !== index);
      setPhotos(updatedPhotos);
    }
  };

  return (
    <Container className="participation-data-container">
      <Row className="justify-content-center">
        <Col xs="12">
          <DropdownButton
            variant="secondary"
            id="dropdown-item-button"
            title={selectedCategory || 'Categories'}
          >
            {categories.map((category) => (
              <Dropdown.Item
                key={category.uuid}
                onClick={() =>
                  handleCategorySelect(i18n.language === 'en' ? category.nameEn : category.nameLt)
                }
              >
                {i18n.language === 'en' ? category.nameEn : category.nameLt}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Card>
          <div {...getRootProps()} style={{ cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <Card.Img
              variant="top"
              src={
                tempPhotos[selectedCategory]?.length > 0
                  ? tempPhotos[selectedCategory][tempPhotos[selectedCategory].length - 1].url
                  : placeholderImage
              }
            />
          </div>
          <Card.Body>
            <Card.Title>{t('Description')}</Card.Title>
            <Card.Text>
              <Form.Control
                as="textarea"
                rows={3}
                value={
                  tempPhotos[selectedCategory]?.length > 0
                    ? tempPhotos[selectedCategory][tempPhotos[selectedCategory].length - 1]
                        .description
                    : ''
                }
                onChange={(e) => {
                  const newDescription = e.target.value;
                  setTempPhotos((prevTempPhotos) => ({
                    ...prevTempPhotos,
                    [selectedCategory]: prevTempPhotos[selectedCategory].map((photo, index) => {
                      if (index === prevTempPhotos[selectedCategory].length - 1) {
                        return { ...photo, description: newDescription };
                      }
                      return photo;
                    })
                  }));
                }}
              />
            </Card.Text>
            <Row className="upload-submit-buttons">
              <Col xs="12">
                <Button
                  {...getRootProps()}
                  variant="secondary"
                  disabled={
                    !selectedCategory ||
                    (tempPhotos[selectedCategory]?.length || 0) >= maxUploadsPerCategory ||
                    Object.keys(tempPhotos).reduce(
                      (total, category) => total + (tempPhotos[category]?.length || 0),
                      0
                    ) >= maxTotalUploads
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
        {(photos[selectedCategory] || []).map((photo, index) => (
          <Col key={index} className="mb-3" xs={6} md={4} lg={3}>
            <div style={{ position: 'relative' }}>
              <Image
                src={photo.url}
                thumbnail
                onClick={() => handleImageClick(photo.url, photo.description)}
              />

              <Button
                variant="danger"
                size="sm"
                style={{ position: 'absolute', top: 0, left: 0 }}
                onClick={() => removePhoto(selectedCategory, index)}
              >
                X
              </Button>
            </div>
          </Col>
        ))}
        {selectedCategory &&
          (tempPhotos[selectedCategory] || []).map((photo, index) => (
            <Col key={`temp-${index}`} className="mb-3" xs={6} md={4} lg={3}>
              <div style={{ position: 'relative' }}>
                <Image
                  src={photo.url}
                  thumbnail
                  onClick={() => handleImageClick(photo.url, photo.description)}
                />
                <Button
                  variant="danger"
                  size="sm"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  onClick={() => removePhoto(selectedCategory, index, true)}
                >
                  X
                </Button>
              </div>
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
