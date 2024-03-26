import {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import Config from "../../config/Config.js";
import axios from "axios";
import {useAuth} from "../../context/AuthContext.jsx";
import LoadingMessage from "../../messages/LoadingMessage.jsx";
import {useParams} from "react-router-dom";

const AdminManageUsersProfilePage = () => {
    const {t} = useTranslation();
    const {getTokenHeader} = useAuth();
    const [userData, setUserData] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const {uuid} = useParams();

    useEffect(() => {
        const url = Config.apiDomain + Config.endpoints.users.userDetails
            .replace('{uuid}', uuid);
        const cfg = {
            headers: {
                ...(getTokenHeader() || {})
            }
        };

        axios
            .get(url, cfg)
            .then((response) => {
                setUserData(response.data);
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    const getRoleDisplayName = (role) => {
        switch(role) {
            case 'JURY':
                return t('adminManageUsersPage.jury');
            case 'USER':
                return t('adminManageUsersPage.user');
            case 'MODERATOR':
                return t('adminManageUsersPage.moderator');
            case 'ADMIN':
                return t('adminManageUsersPage.admin');
            default:
                return role;
        }
    };

    return (
        <>
            {isLoading && <LoadingMessage/>}

            <Container className="profile-page-container">

                <Row className="profile-header">
                    <Col xs="12" md="6">
                        <h3>{t('profile.myProfile')}</h3>
                    </Col>
                    {userData && (
                        <Col xs="12" md="6">
                            <p className="profile-role">{getRoleDisplayName(userData.role)}</p>
                        </Col>
                    )}
                </Row>

                <div className="profile-divider"></div>

                {userData && (
                    <>
                        <Col className="profile-about-column">
                            <Row className="profile-name-lastname-row">
                                <Col xs="12" md="auto" className="pe-0">
                                    <p className="profile-name"> {userData.name}</p>
                                </Col>
                                <Col xs="12" md="auto">
                                    <p className="profile-lastname"> {userData.surname}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="auto" className="pe-0">
                                    <p> {userData.email}</p>
                                </Col>

                                <Col xs="12" md="auto">
                                    <p> {userData.phone_number}</p>
                                </Col>
                            </Row>
                            <Col xs="12">
                                <p>
                                    {t('profile.birthYear')}: {userData.birth_year}
                                </p>
                            </Col>
                            <Col xs="12">
                                <p className="profile-media">
                                    {t('profile.media')}: {userData.media_name ?? t('profile.noMedia')}
                                </p>
                            </Col>
                            <div className="profile-divider-media-top"></div>
                            <Col xs="12" className="mt-3">
                                <p>
                                    {t('profile.isActive')}: {userData.is_active ? t('profile.unblocked') : t('profile.blocked')}
                                </p>
                            </Col>

                        </Col>
                        <div className="profile-divider-media-bottom"></div>
                        <Row className="profile-footer">
                            <Col xs="12" lg="6">
                                <p className="profile-id">
                                    {t('profile.id')}: {userData.uuid}
                                </p>
                            </Col>
                            <Col xs="12" lg="6">
                                <p className="profile-create-date">
                                    {t('profile.createdAt')}: {userData.created_at}
                                </p>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    );
};

export default AdminManageUsersProfilePage;
