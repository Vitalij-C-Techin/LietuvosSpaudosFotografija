import React from 'react';
import { Modal, Button } from 'react-bootstrap';

//TODO add correct api link
//TODO add modal bory if not corresponds to wireframe

const CategoryModal = ({ showModal, onClose }) => {

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Categories</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;
