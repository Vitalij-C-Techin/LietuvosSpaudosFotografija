import React, { useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ModalEditCategory = ({ showModal, onClose, selectedCategoryUUID, handleCategoryChange }) => {
  const [formData, setFormData] = useState({});
  const { getTokenHeader } = useAuth();

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
          category_nameLt: categoryData.nameLt || '',
          category_nameEn: categoryData.nameEn || '',
          category_descriptionLt: categoryData.descriptionLt || '',
          category_descriptionEn: categoryData.descriptionEn || '',
          albumType: categoryData.albumType || '',
          photoLimit: categoryData.photoLimit || ''
        }));
      } catch (error) {
        console.log('Error fetching category data:', error);
      }
    };

    if (selectedCategoryUUID) {
      fetchCategoryData();
    }
  }, [selectedCategoryUUID, getTokenHeader]);

  const handleCategoryAction = async (action) => {
    try {
      if (action === 'delete') {
        await axios.delete(`http://localhost:8080/api/v1/category/${selectedCategoryUUID}`, {
          headers: getTokenHeader()
        });
        // Update parent component state to remove the deleted category
        handleCategoryChange(selectedCategoryUUID);
      } else if (action === 'update') {
        await axios.put(`http://localhost:8080/api/v1/category/${selectedCategoryUUID}`, formData, {
          headers: getTokenHeader()
        });
        // Update parent component state to reflect changes in the updated category
        handleCategoryChange(selectedCategoryUUID, formData);
      }
    } catch (error) {
      console.error(`Error ${action === 'delete' ? 'deleting' : 'updating'} category:`, error);
    }
    onClose();
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
          name="category_nameEn"
          id="category_nameEn"
          value={formData.category_nameEn || ''}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modalCategory.titleCat_lt')}</Form.Label>
        <Form.Control
          type="text"
          name="category_nameLt"
          id="category_nameLt"
          value={formData.category_nameLt || ''}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modalCategory.description_lt')}</Form.Label>
        <Form.Control
          type="text"
          name="category_descriptionLt"
          id="category_descriptionLt"
          value={formData.category_descriptionLt || ''}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modalCategory.description_en')}</Form.Label>
        <Form.Control
          type="text"
          name="category_descriptionEn"
          id="category_descriptionEn"
          value={formData.category_descriptionEn || ''}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modalCategory.type')}</Form.Label>
        <Form.Control
          as="select"
          name="albumType"
          id="albumType"
          onChange={handleInputChange2}
          value={formData.albumType || ''}
        >
          <option value=""></option>
          <option value="SINGLE">{t('modalCategory.single')}</option>
          <option value="SERIES">{t('modalCategory.series')}</option>
        </Form.Control>
        <Form.Label>{t('modalCategory.photoLimit')}</Form.Label>
        <Form.Control
          name="photoLimit"
          id="photoLimit"
          value={formData.photoLimit || ''}
          onChange={handleInputChange2}
          min="1"
          max="15"
        ></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t('modalCategory.closeButton')}
        </Button>
        <Button variant="secondary" onClick={() => handleCategoryAction('update')}>
          {t('modalCategory.updateCategory')}
        </Button>
        <Button variant="secondary" onClick={() => handleCategoryAction('delete')}>
          {t('modalCategory.deleteCategory')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditCategory;
