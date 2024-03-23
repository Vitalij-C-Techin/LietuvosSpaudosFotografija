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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>{userList.map((user) => (
                        <tr key={user.uuid}>
                            <td className="col">
                                {user.name}
                            </td>
                            <td className="col">
                                {user.surname}
                            </td>
                            <td className="col">
                                {user.birth_year}
                            </td>
                            <td className="col">
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
                            <td>
                                <div className="d-flex gap-2 flex-column flex-lg-row flex-md-row align-end">
                                    <Button
                                        onClick={() => navigate(`/profile/${user.uuid}`)}
                                        variant="outline-success"
                                        className="align-content-center d-inline-flex"
                                    >
                                        <span>{t('adminManageUsersPage.userDetails')}</span>
                                    </Button>
                                    <Button
                                        onClick={() => handleUpdateClick(user.uuid)}
                                        variant="outline-warning"
                                        className="align-content-center d-inline-flex"
                                    >
                                        <span>{t('adminManageUsersPage.updateRole')}</span>
                                    </Button>
                                    <UserBlocker
                                        userUuid={user.uuid}
                                        currentStatus={user.is_active}
                                        getAndUpdateStatus={getUserList}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <div className="pagination-controls-container d-flex justify-content-center">
                    <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </Container>
        </>
    );
}

export default AdminMangeUsersListForm;