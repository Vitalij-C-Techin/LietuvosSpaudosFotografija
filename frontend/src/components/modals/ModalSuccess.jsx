import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useTranslation} from "react-i18next";

const ModalSentRequestSuccess = ({show, handleClose, customMessage}) => {
    const {t} = useTranslation();

    return (
        <>
            <Modal show={show} onHide={handleClose} data-testid="modal-success">
                <Modal.Header>
                    <Modal.Title>{t(customMessage)}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('modal.continue')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSentRequestSuccess;