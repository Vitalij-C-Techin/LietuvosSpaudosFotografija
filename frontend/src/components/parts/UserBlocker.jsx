import {useEffect, useState} from 'react';
import axios from 'axios';
import Config from '../config/Config.js';
import {useTranslation} from "react-i18next";
import {useAuth} from "../context/AuthContext.jsx";
import {Button} from "react-bootstrap";
import ModalRoleUpdateSuccess from "../modals/ModalRoleUpdateSuccess.jsx";

const UserBlocker = ({userUuid, currentStatus, getAndUpdateStatus}) => {
    const [t] = useTranslation();
    const {getTokenHeader} = useAuth();
    const [status, setStatus] = useState(currentStatus)

    useEffect(() => {
        setStatus(currentStatus);
    }, [currentStatus]);

    const blockUser = () => {
        const newStatus = !status;
        const url = Config.apiDomain + Config.endpoints.users.blockUser.replace("{uuid}", userUuid);
        const cfg = {
            headers: {
                ...(getTokenHeader() || {})
            }
        };
        axios
            .patch(url, {is_active: newStatus}, cfg)
            .then(() => {
                getAndUpdateStatus();
            })
            .catch((error) => console.error(error));
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            {status ?
                <Button
                    onClick={blockUser}
                    variant="outline-danger"
                    className="align-content-center d-inline-flex"
                >
                    <span>{t('adminManageUsersPage.blockUser')}</span>
                </Button> :
                <Button
                    onClick={blockUser}
                    variant="outline-danger"
                    className="align-content-center d-inline-flex"
                >
                    <span>{t('adminManageUsersPage.unblockUser')}</span>
                </Button>
            }
        </>
    );
};

export default UserBlocker;