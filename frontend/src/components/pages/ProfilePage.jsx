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
      <Container>
        <Row className="profile-header">
          <Col>
            <h3>{t('profile.myProfile')}</h3>
          </Col>
          <IsAuthenticated>
            <Col className="profile-role">{getUserData().role}</Col>
          </IsAuthenticated>
        </Row>

        <IsNotAuthenticated>
          <>
            <p>{t('profile.userIsNotLoggedIn')}</p>
          </>
        </IsNotAuthenticated>

        <IsAuthenticated>
          {!!getUserData() && (
            <>
              <Row>
                <Col>
                  {t('profile.name')}: {getUserData().name}
                </Col>
                <Col>
                  {t('profile.surname')}: {getUserData().surname}
                </Col>
                <Col>
                  {t('profile.email')}: {getUserData().email}
                </Col>
                <Col>
                  {t('profile.birthYear')}: {getUserData().birth_year}
                </Col>
                <Col>
                  {t('profile.phoneNumber')}: {getUserData().phone_number}
                </Col>
                <Col>
                  {t('profile.media')}: {getUserData().media_name}
                </Col>
              </Row>
            </>
          )}
          <Button as={NavLink} to="/profile/edit">
            {t('profile.editProfile')}
          </Button>
          <Row>
            <Col>
              {t('profile.id')}: {getUserData().uuid}
            </Col>
            <Col>
              {t('profile.createdAt')}: {getUserData().created_at}
            </Col>
          </Row>
        </IsAuthenticated>
      </Container>
    </>
  );
};

export default ProfilePage;
