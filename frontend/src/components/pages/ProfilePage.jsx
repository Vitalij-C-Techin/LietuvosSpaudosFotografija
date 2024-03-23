import { useTransition } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Authentication, IsAuthenticated, IsNotAuthenticated } from '../utils/Authentication';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { getUserData, isLoggedIn } = useAuth();

  return (
    <>
      <Container xs="4" className="profile-page-container">
        <Row className="profile-header">
          <Col xs="12">
            <h3>{t('profile.myProfile')}</h3>
          </Col>
          <IsAuthenticated>
            <Col xs="12" className="profile-role">
              <p>{getUserData().role}</p>
            </Col>
          </IsAuthenticated>
        </Row>

        <IsNotAuthenticated>
          <>
            <p>{t('profile.userIsNotLoggedIn')}</p>
          </>
        </IsNotAuthenticated>
        <div className="profile-divider"></div>
        <IsAuthenticated>
          {!!getUserData() && (
            <>
              <Row>
                <Col xs="12">
                  <p className="profile-name">
                    {' '}
                    {t('profile.name')}: {getUserData().name}
                  </p>
                </Col>
                <Col xs="12">
                  <p  className="profile-name">
                    {' '}
                    {t('profile.surname')}: {getUserData().surname}
                  </p>
                </Col>
                <Col xs="12">
                  <p>
                    {' '}
                    {t('profile.email')}: {getUserData().email}
                  </p>
                </Col>
                <Col xs="12">
                  <p>
                    {' '}
                    {t('profile.birthYear')}: {getUserData().birth_year}
                  </p>
                </Col>
                <Col xs="12">
                  <p>
                    {' '}
                    {t('profile.phoneNumber')}: {getUserData().phone_number}
                  </p>
                </Col>
              </Row>
              <div className="profile-divider"></div>
              <Col xs="12">
                <p>
                  {t('profile.media')}: {getUserData().media_name}
                </p>
              </Col>
            </>
          )}
          <Col xs="12">
            <Button variant="secondary" as={NavLink} to="/profile/edit">
               {t('profile.editProfile')}
            </Button>
          </Col>
          <Row>
            <Col xs="12">
              <p className='profile-id'>
                {' '}
                {t('profile.id')}: {getUserData().uuid}
              </p>
            </Col>
            <Col xs="12">
              <p className='profile-create-date'>
                {t('profile.createdAt')}: {getUserData().created_at}
              </p>
            </Col>
          </Row>
        </IsAuthenticated>
      </Container>
    </>
  );
};

export default ProfilePage;
