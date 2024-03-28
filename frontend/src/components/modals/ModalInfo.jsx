import { Modal } from 'react-bootstrap';

const ModalInfo = ({ children, show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      className="lsf-modal-info"
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      centered
    >
      {children}
    </Modal>
  );
};

export default ModalInfo;
