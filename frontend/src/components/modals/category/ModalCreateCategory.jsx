import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ModalCreateCategory = ({ showModal, onClose, uuid }) => {
  const [t] = useTranslation();
  const { getTokenHeader } = useAuth();
  const [photoLimitError, setPhotoLimitError] = useState('');
  const [formData, setFormData] = useState({
    category_name_lt: '',
    category_name_en: '',
    category_description_lt: '',
    category_description_en: '',
    album_type: '',
    photo_limit: ''
  });

  const createCategory = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/category/competition/${uuid}`, formData, {
        headers: getTokenHeader()
      });
      setFormData({
        category_name_lt: '',
        category_name_en: '',
        category_description_lt: '',
        category_description_en: '',
        album_type: '',
        photo_limit: ''
      });
    } catch (error) {
      alert(t('modalCreate.error'), error);
    }
    onClose();
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
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalCreate.titleCreate')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label> {t('modaleEdit.titleCat_en')}</Form.Label>
        <Form.Control
          type="text"
          name="category_name_en"
          id="category_name_en"
          value={formData.category_name_en}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modaleEdit.titleCat_lt')}</Form.Label>
        <Form.Control
          type="text"
          name="category_name_lt"
          id="category_name_lt"
          value={formData.category_name_lt}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modaleEdit.description_lt')}</Form.Label>
        <Form.Control
          type="text"
          name="category_description_lt"
          id="category_description_lt"
          value={formData.category_description_lt}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modaleEdit.description_en')}</Form.Label>
        <Form.Control
          type="text"
          name="category_description_en"
          id="category_description_en"
          value={formData.category_description_en}
          onChange={handleInputChange2}
        ></Form.Control>
        <Form.Label> {t('modaleEdit.type')}</Form.Label>
        <Form.Control
          as="select"
          name="album_type"
          id="album_type"
          onChange={handleInputChange2}
          value={formData.album_type}
        >
          <option value=""></option>
          <option value="SINGLE">{t('modaleEdit.single')}</option>
          <option value="SERIES">{t('modaleEdit.series')}</option>
        </Form.Control>
        <Form.Label>{t('modaleEdit.photoLimit')}</Form.Label>
        <Form.Control
          name="photo_limit"
          id='photo_limit'
          value={formData.photo_limit}
          onChange={handleInputChange2}
          min="1"
          max="15"
        ></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={createCategory}>
          {t('modalCreate.createCategory')}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          {t('modaleEdit.closeButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateCategory;
