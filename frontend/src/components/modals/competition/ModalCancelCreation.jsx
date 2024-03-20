import React from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ModalCancelCreation = ({ showModal, onClose }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/admin-competitions-list');
  };
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Body>
        <Form.Group controlId="formAsk1">
          <Form.Label> {t('modalCancel.ask1')}</Form.Label>
        </Form.Group>
        <Form.Group controlId="formAsk2">
          <Form.Label>{t('modalCancel.ask2')}</Form.Label>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modalCancel.confirm')}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          {t('modalCancel.closeButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCancelCreation;
