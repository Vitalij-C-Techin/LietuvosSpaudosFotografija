import {useAuth} from '../context/AuthContext';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {IsAuthenticated, IsNotAuthenticated} from '../utils/Authentication';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { getUserData, isLoggedIn } = useAuth();

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
      <Container className="profile-page-container">
        <Col className="profile-btn-column-container">
          <IsAuthenticated>
            <Button
              className="profile-top-button"
              variant="secondary"
              as={NavLink}
              to="/profile/edit"
            >
              {t('profile.editProfile')}
            </Button>
          </IsAuthenticated>
        </Col>

        <Row className="profile-header">
          <Col xs="12" md="6">
            <h3>{t('profile.myProfile')}</h3>
          </Col>
          <IsAuthenticated>
            {!!getUserData() && (
              <Col xs="12" md="6">
                <p className="profile-role">{getRoleDisplayName(getUserData().role)}</p>
              </Col>
            )}
          </IsAuthenticated>
        </Row>

        <div className="profile-divider"></div>

        <IsNotAuthenticated>
          <>
            <p className="mt-3">{t('profile.userIsNotLoggedIn')}</p>
          </>
        </IsNotAuthenticated>

        <IsAuthenticated>
          {!!getUserData() && (
            <>
              <Col className="profile-about-column">
                <Row className="profile-name-lastname-row">
                  <Col xs="12" md="auto" className="pe-0">
                    <p className="profile-name"> {getUserData().name}</p>
                  </Col>
                  <Col xs="12" md="auto">
                    <p className="profile-lastname"> {getUserData().surname}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="auto" className="pe-0">
                    <p> {getUserData().email}</p>
                  </Col>

                  <Col xs="12" md="auto">
                    <p> {getUserData().phone_number}</p>
                  </Col>
                </Row>
                <Col xs="12">
                  <p>
                    {t('profile.birthYear')}: {getUserData().birth_year}
                  </p>
                </Col>

                <div className="profile-divider-media-top"></div>
                <Col xs="12">
                  <p className="profile-media">
                    {t('profile.media')}: {getUserData().media_name !== null
                  && getUserData().media_name !== '' ? getUserData().media_name : t('profile.noMedia')}
                  </p>
                </Col>
              </Col>
              <div className="profile-divider-media-bottom"></div>
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
                    {t('profile.id')}: {getUserData().uuid}
                  </p>
                </Col>
                <Col xs="12" lg="6">
                  <p className="profile-create-date">
                    {t('profile.createdAt')}: {getUserData().created_at}
                  </p>
                </Col>
              </Row>
            </>
          )}
        </IsAuthenticated>
      </Container>
    </>
  );
};

export default ProfilePage;
