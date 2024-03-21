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
      <Container xs="4" className='profile-page-container'>
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
                  {t('profile.name')}: {getUserData().name}
                </Col>
                <Col xs="12">
                  {t('profile.surname')}: {getUserData().surname}
                </Col>
                <Col xs="12">
                  {t('profile.email')}: {getUserData().email}
                </Col>
                <Col xs="12">
                  {t('profile.birthYear')}: {getUserData().birth_year}
                </Col>
                <Col xs="12">
                  {t('profile.phoneNumber')}: {getUserData().phone_number}
                </Col>
              </Row>
              <div className="profile-divider"></div>
              <Col xs="12">
                {t('profile.media')}: {getUserData().media_name}
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
              {t('profile.id')}: {getUserData().uuid}
            </Col>
            <Col xs="12">
              {t('profile.createdAt')}: {getUserData().created_at}
            </Col>
          </Row>
        </IsAuthenticated>
      </Container>
    </>
  );
};

export default ProfilePage;
