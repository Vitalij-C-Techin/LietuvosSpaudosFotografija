import { useTransition } from 'react';
import { useAuth } from '../context/AuthContext';

import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IsAuthenticated, IsNotAuthenticated } from '../utils/Authentication';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { getUserData, isLoggedIn } = useAuth();

  return (
    <>
      <Container>
        <h3>{t('Profile')}</h3>

        <IsNotAuthenticated>
          <>
            <p>{t('profile.userIsNotLoggedIn')}</p>
          </>
        </IsNotAuthenticated>

        <IsAuthenticated>
          {null != getUserData() && (
            <>
              <p>
                {t('ID')}: {getUserData().uuid}
              </p>
              <p>
                {t('Name')}: {getUserData().name}
              </p>
              <p>
                {t('Surname')}: {getUserData().surname}
              </p>
              <p>
                {t('Email')}: {getUserData().email}
              </p>
              <p>
                {t('Role')}: {getUserData().role}
              </p>
              <p>
                {t('Birth year')}: {getUserData().birth_year}
              </p>
              <p>
                {t('Phone number')}: {getUserData().phone_number}
              </p>
              <p>
                {t('Media')}: {getUserData().media_name}
              </p>
              <p>
                {t('Created At')}: {getUserData().created_at}
              </p>
            </>
          )}
        </IsAuthenticated>
      </Container>
    </>
  );
};

export default ProfilePage;
