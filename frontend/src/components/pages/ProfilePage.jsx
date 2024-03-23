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
          <Col xs="12" md="6">
            <h3>{t('profile.myProfile')}</h3>
          </Col>
          <IsAuthenticated>
            <Col xs="12" md="6" className="profile-role">
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
              <Row className="profile-about">
                <Col xs="12" md="6">
                  <p className="profile-name"> {getUserData().name}</p>
                </Col>
                <Col xs="12" md="6">
                  <p className="profile-lastname"> {getUserData().surname}</p>
                </Col>
                <Col xs="12" md="6">
                  <p> {getUserData().email}</p>
                </Col>

                <Col xs="12" md="6">
                  <p> {getUserData().phone_number}</p>
                </Col>
                <Col xs="12">
                  <p>
                    {' '}
                    {t('profile.birthYear')} : {getUserData().birth_year}
                  </p>
                </Col>
              </Row>
              <div className="profile-divider-media-top"></div>
              <Col xs="12">
                <p className="profile-media">
                  {t('profile.media')}: {getUserData().media_name}
                </p>
              </Col>
              <div className="profile-divider-media-bottom"></div>
            </>
          )}
          <Col xs="12">
            <Button variant="secondary" as={NavLink} to="/profile/edit">
              {t('profile.editProfile')}
            </Button>
          </Col>
          <Row className="profile-footer">
            <Col xs="12">
              <p className="profile-id">
                {' '}
                {t('profile.id')}: {getUserData().uuid}
              </p>
            </Col>
            <Col xs="12">
              <p className="profile-create-date">
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
