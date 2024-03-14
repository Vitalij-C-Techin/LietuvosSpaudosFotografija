import { useTransition } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Authentication, IsAuthenticated, IsNotAuthenticated } from '../utils/Authentication';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { getUserData, isLoggedIn } = useAuth();

  return (
    <>
      <Container>
        <h3>{t('profile.myProfile')}</h3>

        <IsNotAuthenticated>
          <>
            <p>{t('profile.userIsNotLoggedIn')}</p>
          </>
        </IsNotAuthenticated>

        <IsAuthenticated>
          {!!getUserData() && (
            <>
              <p>
                {t('profile.id')}: {getUserData().uuid}
              </p>
              <p>
                {t('profile.name')}: {getUserData().name}
              </p>
              <p>
                {t('profile.surname')}: {getUserData().surname}
              </p>
              <p>
                {t('profile.email')}: {getUserData().email}
              </p>
              <p>
                {t('profile.role')}: {getUserData().role}
              </p>
              <p>
                {t('profile.birthYear')}: {getUserData().birth_year}
              </p>
              <p>
                {t('profile.phoneNumber')}: {getUserData().phone_number}
              </p>
              <p>
                {t('profile.media')}: {getUserData().media_name}
              </p>
              <p>
                {t('profile.createdAt')}: {getUserData().created_at}
              </p>
            </>
          )}
          <Button as={NavLink} to="/profile/edit">
            {t('profile.editProfile')}
          </Button>
        </IsAuthenticated>
      </Container>
    </>
  );
};

export default ProfilePage;
