import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Config from '../../config/Config';
import axios from 'axios';

import LoadingMessage from '../../messages/LoadingMessage';
import EmptyMessage from '../../messages/EmptyMessage';
import { useAuth } from '../../context/AuthContext';

const AdminManageUsersPage = () => {
  const [t] = useTranslation();

  return (
    <>
      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h3>{t('adminManageUsersPage.title')}</h3>
        </Card>
      </Container>

      <ActionList />
    </>
  );
};

const ActionList = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const handleCreateUser = () => {
    navigate('/admin-create-user');
  };

  return (
    <>
      <Container className="justify-content-xl-center my-3">
        <Row className="justify-content-end gap-2">
          <Col xs="12" lg="3">
            <Button className="lsf-button w-100" onClick={handleCreateUser}>
              {t('adminManageUsersPage.addUser')}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminManageUsersPage;
