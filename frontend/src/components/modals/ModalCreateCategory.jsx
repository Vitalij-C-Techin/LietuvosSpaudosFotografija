import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const ModalCreateCategory = ({ showModal, onClose }) => {
  //TODO add logic
  const [t] = useTranslation();

  const [formData, setFormData] = useState({
    photoLimit: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'photoLimit' && (value < 1 || value > 50)) {
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
        <Modal.Title>{t('modalCategory.titleAdd')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label> {t('modalCategory.titleCat')}</Form.Label>
        <Form.Control></Form.Control>
        <Form.Label> {t('modalCategory.type')}</Form.Label>
        <Form.Select>
          <option value="1">{t('modalCategory.single')}</option>
          <option value="2">{t('modalCategory.series')}</option>
        </Form.Select>
        <Form.Label>{t('modalCategory.photoLimit')}</Form.Label>
        <Form.Control
          name="photoLimit"
          id="photoLimit"
          value={formData.photoLimit}
          onChange={handleInputChange}
          min="1"
          max="15"
        ></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t('modalCategory.closeButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateCategory;
