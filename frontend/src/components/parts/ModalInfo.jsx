import { Modal } from 'react-bootstrap';

const ModalInfo = ({ children, args }) => {
  return (
    <Modal
      show={args.show}
      onHide={args.onClose}
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
