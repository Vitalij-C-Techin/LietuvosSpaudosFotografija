import React from 'react';
import { Modal, Button} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModalSaveCreateCompetition = ({ showModal, onClose, confirmSave }) => {
  const [t] = useTranslation();

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalCreate.confirmSaveTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={confirmSave}>
          {t('modalCreate.confirm')}
        </Button>
        <Button variant="primary" onClick={onClose}>
          {t('modalCreate.cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSaveCreateCompetition;
