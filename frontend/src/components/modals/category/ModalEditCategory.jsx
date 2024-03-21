import React, { useEffect,useState } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ModalConfirmAction from './ModalConfirmAction';

const ModalEditCategory = ({ showModal, onClose, selectedCategoryUUID, handleCategoryChange }) => {
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
        console.log(t('modalEdit.error'), error);
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
      console.error(`Error ${action === 'delete' ? 'deleting' : 'updating'} category:`, error);
    }
  };

  const handleDeleteConfirmation = async (confirmed) => {
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/category/${selectedCategoryUUID}`, {
          headers: getTokenHeader()
        });
        handleCategoryChange(selectedCategoryUUID);
      } catch (error) {
        console.error(t('modalEdit.error2'), error);
      }
    }
    setShowDeleteConfirmation(false);
    setActionType(null);
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      <Modal show={showModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modaleEdit.titleEdit')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label> {t('modaleEdit.titleCat_en')}</Form.Label>
          <Form.Control
            type="text"
            name="category_name_en"
            id="category_name_en"
            value={formData.category_name_en || ''}
            onChange={handleInputChange2}
          ></Form.Control>
          <Form.Label> {t('modaleEdit.titleCat_lt')}</Form.Label>
          <Form.Control
            type="text"
            name="category_name_lt"
            id="category_name_lt"
            value={formData.category_name_lt || ''}
            onChange={handleInputChange2}
          ></Form.Control>
          <Form.Label> {t('modaleEdit.description_lt')}</Form.Label>
          <Form.Control
            type="text"
            name="category_description_lt"
            id="category_description_lt"
            value={formData.category_description_lt || ''}
            onChange={handleInputChange2}
          ></Form.Control>
          <Form.Label> {t('modaleEdit.description_en')}</Form.Label>
          <Form.Control
            type="text"
            name="category_description_en"
            id="category_description_en"
            value={formData.category_description_en || ''}
            onChange={handleInputChange2}
          ></Form.Control>
          <Form.Label> {t('modaleEdit.type')}</Form.Label>
          <Form.Control
            as="select"
            name="album_type"
            id="album_type"
            onChange={handleInputChange2}
            value={formData.album_type || ''}
          >
            <option value=""></option>
            <option value="SINGLE">{t('modaleEdit.single')}</option>
            <option value="SERIES">{t('modaleEdit.series')}</option>
          </Form.Control>
          <Form.Label>{t('modaleEdit.photoLimit')}</Form.Label>
          <Form.Control
            name="category_photo_limit"
            id="photo_limit"
            value={formData.photo_limit || ''}
            onChange={handleInputChange2}
            min="1"
            max="15"
          ></Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            {t('modaleEdit.closeButton')}
          </Button>
          <Button variant="secondary" onClick={() => handleCategoryAction('update')}>
            {t('modaleEdit.updateCategory')}
          </Button>
          <Button variant="secondary" onClick={() => handleCategoryAction('delete')}>
            {t('modaleEdit.deleteCategory')}
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalConfirmAction
        show={actionType === 'delete' || actionType === 'update'}
        onClose={() => setActionType(null)}
        onConfirm={(confirmed) => {
          if (actionType === 'delete') {
            handleDeleteConfirmation(confirmed);
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
