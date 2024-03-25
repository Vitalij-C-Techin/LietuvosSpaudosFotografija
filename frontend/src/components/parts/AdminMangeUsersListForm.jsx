import {useNavigate} from "react-router-dom";
import {Button, Container, Table} from "react-bootstrap";
import LoadingMessage from "../messages/LoadingMessage.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {useAuth} from "../context/AuthContext.jsx";
import EmptyMessage from "../messages/EmptyMessage.jsx";
import Config from "../config/Config.js";
import UserRoleUpdater from "./UserRoleUpdater.jsx";
import UserBlocker from "./UserBlocker.jsx";
import Pagination from '../parts/Pagination';
import React from 'react';

const AdminMangeUsersListForm = () => {
    const [t] = useTranslation();
    const {getTokenHeader} = useAuth();
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [userUuid, setUserUuid] = useState(false);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(15);
    const [sortBy, setSortBy] = useState('surname');
    const [direction, setDirection] = useState('asc');

    const getUserList = () => {
        const url = Config.apiDomain + Config.endpoints.users.adminAllUsers({
            page,
            size,
            sortBy,
            direction
        });
        const cfg = {
            headers: {
                ...(getTokenHeader() || {})
            }
        };

        axios
            .get(url, cfg)
            .then((response) => {
                setUserList(response.data.content);
                setTotalPages(response.data.totalPages);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getUserList();
    }, [page, size, sortBy, direction]);

    const handleUpdateClick = (userUuid) => {
        setUserUuid(userUuid);
    };

    const handleCancel = () => {
        setUserUuid(false);
    };

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    };

    return (
        <>
            {isLoading && <LoadingMessage/>}

            {!isLoading && !userList?.length && <EmptyMessage/>}

            <Container className="justify-content-xl-center">
                <Table responsive hover striped className="lsf-table">
                    <thead className="table-light">
                    <tr>
                        <th className="col-2">{t('adminManageUsersPage.name')}</th>
                        <th className="col-2">{t('adminManageUsersPage.surname')}</th>
                        <th className="col-2">{t('adminManageUsersPage.birthYear')}</th>
                        <th className="col-2">{t('adminManageUsersPage.role')}</th>
                        <th className="d-none d-lg-table-cell"></th>
                    </tr>
                    </thead>
                    <tbody>{userList.map((user) => (
                        <React.Fragment key={user.uuid}>
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.birth_year}</td>
                                <td>
                                    {user.role}
                                    {userUuid === user.uuid && (
                                        <UserRoleUpdater
                                            userUuid={user.uuid}
                                            currentRole={user.role}
                                            handleCancel={handleCancel}
                                            getAndUpdateRoles={getUserList}
                                        />
                                    )}
                                </td>
                                {/* Action buttons for larger screens */}
                                <td className="d-none d-lg-table-cell">
                                    <div className="d-flex gap-2">
                                        <Button
                                            variant="outline-success"
                                            onClick={() => navigate(`/profile/${user.uuid}`)}
                                        >
                                            {t('adminManageUsersPage.userDetails')}
                                        </Button>
                                        <Button
                                            variant="outline-warning"
                                            onClick={() => handleUpdateClick(user.uuid)}
                                        >
                                            {t('adminManageUsersPage.updateRole')}
                                        </Button>
                                        <UserBlocker
                                            userUuid={user.uuid}
                                            currentStatus={user.is_active}
                                            getAndUpdateStatus={getUserList}
                                        />
                                    </div>
                                </td>
                            </tr>
                            {/* Actions buttons for smaller screens */}
                            <tr className="d-lg-none">
                                <td colSpan="5">
                                    <div className="d-flex gap-2 flex-row justify-content-center">
                                        <Button
                                            variant="outline-success"
                                            onClick={() => navigate(`/profile/${user.uuid}`)}
                                        >
                                            {t('adminManageUsersPage.userDetails')}
                                        </Button>
                                        <Button
                                            variant="outline-warning"
                                            onClick={() => handleUpdateClick(user.uuid)}
                                        >
                                            {t('adminManageUsersPage.updateRole')}</Button>
                                        <UserBlocker
                                            userUuid={user.uuid}
                                            currentStatus={user.is_active}
                                            getAndUpdateStatus={getUserList}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </Table>
                <div className="pagination-controls-container d-flex justify-content-center">
                    <Pagination totalPages={totalPages} onPageChange={handlePageChange}/>
                </div>
            </Container>
        </>
    );
}

export default AdminMangeUsersListForm;