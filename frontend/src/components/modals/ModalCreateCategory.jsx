import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const ModalCreateCategory = ({ showModal, onClose }) => {
  //TODO add logic
  const [t] = useTranslation();

  const [formDat, setFormDat] = useState({
    photoLimitCat: ''
  });

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    if (name === 'photoLimitCat') {
      if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 50)) {
        setFormDat({
          ...formDat,
          [name]: value
        });
      }
      setError('Photo limit must be between 1 and 15');
    } else {
      setFormDat({
        ...formDat,
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
          name="photoLimitCat"
          id="photoLimitCat"
          value={formDat.photoLimitCat}
          onChange={handleInputChange2}
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
