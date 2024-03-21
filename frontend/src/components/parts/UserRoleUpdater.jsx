import {useEffect, useState} from 'react';
import axios from 'axios';
import Config from '../config/Config.js';
import {useTranslation} from "react-i18next";
import {useAuth} from "../context/AuthContext.jsx";
import {Button} from "react-bootstrap";
import ModalRoleUpdateSuccess from "../modals/ModalRoleUpdateSuccess.jsx";
import {useNavigate} from "react-router-dom";

const UserRoleUpdater = ({userUuid, currentRole, closeModal, handleCancel}) => {
    const [t] = useTranslation();
    const {getTokenHeader} = useAuth();
    const [selectedRole, setSelectedRole] = useState(currentRole);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const roles = [
        {value: '', displayName: t('adminManageUsersPage.chooseRole')},
        {value: 'JURY', displayName: t('adminManageUsersPage.jury')},
        {value: 'USER', displayName: t('adminManageUsersPage.user')},
        {value: 'MODERATOR', displayName: t('adminManageUsersPage.moderator')},
        {value: 'ADMIN', displayName: t('adminManageUsersPage.admin')},
    ];

    const updateRole = () => {
        console.log("user uuid: " + userUuid);
        const url = Config.apiDomain + Config.endpoints.users.updateRole.replace("{uuid}", userUuid);
        const cfg = {
            headers: {
                ...(getTokenHeader() || {})
            }
        };
        axios
            .patch(url, {role: selectedRole}, cfg)
            .then(() => {
                setShowModal(true);
            })
            .catch((error) => console.error(error));
    };

    const handleSave = () => {
        updateRole()
    };

    const handleCloseModal = () => {
        setShowModal(false);
        handleCancel();
        window.location.reload();
    }

    return (
        <>
            <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
            >
                {roles.map(role => (
                    <option key={role.value} value={role.value}>
                        {role.displayName}
                    </option>
                ))}
            </select>
            <div className="d-flex gap-2 flex-column flex-lg-row flex-md-row align-end mt-1">
                <Button
                    onClick={handleSave}
                    variant="outline-success"
                    size="sm"
                    className="align-content-center d-inline-flex"
                >
                    <span>{t('adminManageUsersPage.save')}</span>
                </Button>
                <Button
                    onClick={handleCancel}
                    variant="outline-danger"
                    size="sm"
                    className="align-content-center d-inline-flex"
                >
                    <span>{t('adminManageUsersPage.cancel')}</span>
                </Button>
            </div>
            <ModalRoleUpdateSuccess show={showModal} handleClose={handleCloseModal} />
        </>
    );
};

export default UserRoleUpdater;