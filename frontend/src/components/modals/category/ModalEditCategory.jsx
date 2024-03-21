import React, { useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'

const ModalEditCategory = ({ showModal, onClose, selectedCategoryUUID }) => {
  const [formData, setFormData] = useState([]);
  const { getTokenHeader } = useAuth();
  // console.log(selectedCategoryUUID);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/category/${selectedCategoryUUID}`,
          {
            headers: getTokenHeader()
          }
        );

        const categoryData = response.data;
        setFormData((prevFormData) => ({
          ...prevFormData,
          category_name_lt: categoryData.data.nameLt || '',
          category_name_en: categoryData.data.nameEn || '',
          category_description_lt: categoryData.data.descriptionLt || '',
          category_description_en: categoryData.data.descriptionEn || '',
          album_type: categoryData.data.albumType || '',
          photo_limit: categoryData.data.photoLimit || ''
        }));
      } catch (error) {
        console.log('Error fetching category data:', error);
      }
    };

    if (selectedCategoryUUID) {
      fetchCategoryData();
    }
  }, [selectedCategoryUUID, getTokenHeader, setFormData]);

  const confirmSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/category/${selectedCategoryUUID}`, formData, {
        headers: getTokenHeader()
      });
    } catch (error) {
      console.error('Error saving competition:', error);
    }
    onClose(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/category/${selectedCategoryUUID}`, {
        headers: getTokenHeader()
      });
    } catch (error) {
      console.log('Error deleting competition', error);
    }
    onClose(true);
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    if (name === 'photo_limit') {
      if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 15)) {
        setFormData({
          ...formData,
          [name]: value
        });
        setPhotoLimitError('');
      } else {
        setPhotoLimitError(t('editcomp.limitError'));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const [t] = useTranslation();
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalCategory.titleEdit')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label> {t('modalCategory.titleCat_en')}</Form.Label>
        <Form.Control
          type="text"
          name="category_name_en"
          id="category_name_en"
          value={formData.category_name_en || ''}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modalCategory.titleCat_lt')}</Form.Label>
        <Form.Control
          type="text"
          name="category_name_lt"
          id="category_name_lt"
          value={formData.category_name_lt || ''}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modalCategory.description_lt')}</Form.Label>
        <Form.Control
          type="text"
          name="category_description_lt"
          id="category_description_lt"
          value={formData.category_description_lt || ''}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modalCategory.description_en')}</Form.Label>
        <Form.Control
          type="text"
          name="category_description_en"
          id="category_description_en"
          value={formData.category_description_en || ''}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modalCategory.type')}</Form.Label>
        <Form.Control
          as="select"
          name="album_type"
          id="album_type"
          onChange={handleInputChange2}
          value={formData.album_type || ''}
        >
          <option value=""></option>
          <option value="SINGLE">{t('modalCategory.single')}</option>
          <option value="SERIES">{t('modalCategory.series')}</option>
        </Form.Control>
        <Form.Label>{t('modalCategory.photoLimit')}</Form.Label>
        <Form.Control
          name="photo_limit"
          id="photo_limit"
          value={formData.photo_limit || ''}
          onChange={handleInputChange2}
          min="1"
          max="15"
        ></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t('modalCategory.closeButton')}
        </Button>
        <Button variant="secondary" onClick={confirmSave}>
          {t('modalCategory.updateCategory')}
        </Button>
        <Button variant="secondary" onClick={handleDelete}>
          {t('modalCategory.deleteCategory')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditCategory;
