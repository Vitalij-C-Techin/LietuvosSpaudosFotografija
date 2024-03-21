import {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import Config from "../config/Config.js";
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";
import LoadingMessage from "../messages/LoadingMessage.jsx";
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

    return (
        <>
            {isLoading && <LoadingMessage/>}

            <Container>
                <h3>{t('profile.myProfile')}</h3>

                {userData && (
                    <>
                        <p>
                            {t('profile.id')}: {userData.uuid}
                        </p>
                        <p>
                            {t('profile.name')}: {userData.name}
                        </p>
                        <p>
                            {t('profile.surname')}: {userData.surname}
                        </p>
                        <p>
                            {t('profile.email')}: {userData.email}
                        </p>
                        <p>
                            {t('profile.role')}: {userData.role}
                        </p>
                        <p>
                            {t('profile.birthYear')}: {userData.birth_year}
                        </p>
                        <p>
                            {t('profile.phoneNumber')}: {userData.phone_number}
                        </p>
                        <p>
                            {t('profile.media')}: {userData.media_name}
                        </p>
                        <p>
                            {t('profile.isActive')}: {userData.is_active ? t('profile.unblocked') : t('profile.blocked')}
                        </p>
                        <p>
                            {t('profile.createdAt')}: {userData.created_at}
                        </p>
                    </>
                )}
            </Container>
        </>
    );
};

export default AdminManageUsersProfilePage;
