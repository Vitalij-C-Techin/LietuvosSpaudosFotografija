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
      <Container className="profile-page-container">
        <Col className="profile-btn-column-container">
        <Button className="profile-top-button" variant="secondary" as={NavLink} to="/profile/edit">
          {t('profile.editProfile')}
        </Button>
        </Col>
        <Row className="profile-header">
          <Col xs="12" md="6">
            <h3>{t('profile.myProfile')}</h3>
          </Col>
          <IsAuthenticated>
            <Col xs="12" md="6" >
              <p className="profile-role">{getUserData().role}</p>
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
              <Col className='profile-about-column' >         
                  <Row className='profile-name-lastname-row'>
                    <Col xs="12" md="auto">
                      <p className="profile-name"> {getUserData().name}</p>
                    </Col>
                    <Col xs="12" md="auto">
                      <p className="profile-lastname"> {getUserData().surname}</p>
                    </Col>
                    </Row>
                  <Row>
                  <Col xs="12" md="auto">
                    <p> {getUserData().email}</p>
                  </Col>

                  <Col xs="12" md="auto">
                    <p> {getUserData().phone_number}</p>
                  </Col>
                  </Row>
                  <Col xs="12">
                    <p>
                      {' '}
                      {t('profile.birthYear')} : {getUserData().birth_year}
                    </p>
                  </Col>
               
                <div className="profile-divider-media-top"></div>
                <Col xs="12">
                  <p className="profile-media">
                    {t('profile.media')}: {getUserData().media_name}
                  </p>
                </Col>
              </Col>
              <div className="profile-divider-media-bottom"></div>
            </>
          )}
          <Col xs="12">
            <Button
              className="profile-bottom-button"
              variant="secondary"
              as={NavLink}
              to="/profile/edit"
            >
              {t('profile.editProfile')}
            </Button>
          </Col>
          <Row className="profile-footer">
            <Col xs="12" lg="6">
              <p className="profile-id">
                {' '}
                {t('profile.id')}: {getUserData().uuid}
              </p>
            </Col>
            <Col xs="12" lg="6">
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
