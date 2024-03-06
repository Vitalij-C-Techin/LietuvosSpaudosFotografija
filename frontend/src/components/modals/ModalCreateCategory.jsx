import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModalCreateCategory = ({ showModal, onClose }) => {
  //TODO add logic
  const [t] = useTranslation();
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalAddCategory.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateCategory;
