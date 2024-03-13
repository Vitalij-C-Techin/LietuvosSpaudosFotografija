import React from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

//TODO add correct api link
//TODO add modal bory if not corresponds to wireframe

const ModalCategory = ({ showModal, onClose }) => {
  const [t] = useTranslation();
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalCategory.titleEdit')}</Modal.Title>
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
        <Form.Control min="1" max="15"></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t('modalCategory.closeButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCategory;
