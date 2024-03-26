import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ModalConfirmAction from './ModalConfirmAction';

const ModalEditCategory = ({
  showModal,
  onClose,
  selectedCategoryUUID,
  handleCategoryChange,
  updateCategoriesAfterDelete
}) => {
  const [formData, setFormData] = useState({});
  const { getTokenHeader } = useAuth();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [t] = useTranslation();

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
          category_name_lt: categoryData.nameLt || '',
          category_name_en: categoryData.nameEn || '',
          category_description_lt: categoryData.descriptionLt || '',
          category_description_en: categoryData.descriptionEn || '',
          album_type: categoryData.albumType || '',
          photo_limit: categoryData.photoLimit || ''
        }));
      } catch (error) {
        alert(t('modalEdit.error'), error);
      }
    };

    if (selectedCategoryUUID) {
      fetchCategoryData();
    }
  }, [selectedCategoryUUID, getTokenHeader]);

  const handleCategoryAction = async (action) => {
    try {
      if (action === 'delete') {
        setActionType('delete');
      } else if (action === 'update') {
        setActionType('update');
      }
    } catch (error) {
      alert(`Error ${action === 'delete' ? 'deleting' : 'updating'} category:`, error);
    }
  };

  const handleDeleteConfirmation = async (confirmed) => {
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/category/${selectedCategoryUUID}`, {
          headers: getTokenHeader()
        });
        updateCategoriesAfterDelete(selectedCategoryUUID);
      } catch (error) {
        alert(t('modalEdit.error2'), error);
        return;
      }
    }
    setShowDeleteConfirmation(false);
    setActionType(null);
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    if (name === 'photo_limit') {
      if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 15)) {
        setFormData({
          ...formData,
          [name]: value
        });
      } else {
        alert(t('modalEdit.errorPhoto'));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modalEdit.titleEdit')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label> {t('modalEdit.titleCat_lt')}</Form.Label>
          <Form.Control
            type="text"
            name="category_name_lt"
            id="category_name_lt"
            value={formData.category_name_lt || ''}
            onChange={handleInputChange2}
          ></Form.Control>
          <Form.Label> {t('modalEdit.titleCat_en')}</Form.Label>
          <Form.Control
            type="text"
            name="category_name_en"
            id="category_name_en"
            value={formData.category_name_en || ''}
            onChange={handleInputChange2}
          ></Form.Control>
          <Form.Label> {t('modalEdit.description_lt')}</Form.Label>
          <Form.Control
            type="text"
            name="category_description_lt"
            id="category_description_lt"
            value={formData.category_description_lt || ''}
            onChange={handleInputChange2}
          ></Form.Control>
          <Form.Label> {t('modalEdit.description_en')}</Form.Label>
          <Form.Control
            type="text"
            name="category_description_en"
            id="category_description_en"
            value={formData.category_description_en || ''}
            onChange={handleInputChange2}
          ></Form.Control>
          <Form.Label> {t('modalEdit.type')}</Form.Label>
          <Form.Control
            as="select"
            name="album_type"
            id="album_type"
            onChange={handleInputChange2}
            value={formData.album_type || ''}
          >
            <option value=""></option>
            <option value="SINGLE">{t('modalEdit.single')}</option>
            <option value="SERIES">{t('modalEdit.series')}</option>
          </Form.Control>
          <Form.Label>{t('modalEdit.photoLimit')}</Form.Label>
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
            {t('modalEdit.closeButton')}
          </Button>
          <Button variant="secondary" onClick={() => handleCategoryAction('update')}>
            {t('modalEdit.updateCategory')}
          </Button>
          <Button variant="secondary" onClick={() => handleCategoryAction('delete')}>
            {t('modalEdit.deleteCategory')}
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalConfirmAction
        show={actionType === 'delete' || actionType === 'update'}
        onClose={() => setActionType(null)}
        onConfirm={(confirmed) => {
          if (actionType === 'delete') {
            handleDeleteConfirmation(confirmed);
            onClose();
          } else if (actionType === 'update' && confirmed) {
            handleCategoryChange(selectedCategoryUUID, formData);
            onClose();
          }
        }}
        action={actionType}
      />
    </>
  );
};

export default ModalEditCategory;
