import React from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModalConfirmAction = ({ show, onClose, onConfirm, action }) => {
  const [t] = useTranslation();
  const handleConfirm = (confirmed) => {
    onConfirm(confirmed);
    onClose();
  };

  const getMessage = () => {
    if (action === 'delete') {
      return t('modal.confirmDeleteMessage');
    } else if (action === 'update') {
      return t('modal.confirmUpdateMessage');
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.confirmTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{getMessage()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleConfirm(false)}>
          {t('modalCancel.closeButton')}
        </Button>
        <Button variant="primary" onClick={() => handleConfirm(true)}>
          {t('modalCancel.confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmAction;
