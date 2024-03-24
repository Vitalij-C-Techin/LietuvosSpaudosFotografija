import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useTranslation} from "react-i18next";

const ModalRoleUpdateSuccess = ({show, handleClose}) => {
    const {t} = useTranslation();

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{t('modal.updated')}</Modal.Title>
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

export default ModalRoleUpdateSuccess;