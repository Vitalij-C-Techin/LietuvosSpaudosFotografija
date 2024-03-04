import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image, Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoadingMessage from '../messages/LoadingMessage';
import EmptyMessage from '../messages/EmptyMessage';

const AdminUserParticipationRequestPage = () => {
  const [t] = useTranslation();

  const [userRequests, setUserRequests] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUserRequests([{}, {}, {}]);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h3>{t('adminUserParticipationRequestPage.title')}</h3>
        </Card>
      </Container>

      {!!isLoading && <LoadingMessage />}

      {!!!isLoading && !!!userRequests && <EmptyMessage />}

      {!!!isLoading && !!userRequests && <UserRequestList userRequests={userRequests} />}
    </>
  );
};

const UserRequestList = ({ userRequests }) => {
  const [t] = useTranslation();

  const list = userRequests.map((userRequest, i) => {
    return <UserRequestSingle userRequest={userRequest} key={i} />;
  });

  return (
    <Container className="justify-content-xl-center">
      <Table responsive hover striped className="lsf-table">
        <thead className="table-light">
          <tr>
            <th className="col-4">{t('adminUserParticipationRequestPage.participator')}</th>
            <th className="col-12">{t('adminUserParticipationRequestPage.competition')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </Table>
    </Container>
  );
};

const UserRequestSingle = ({ userRequest }) => {
  const [t] = useTranslation();

  const handleInfo = () => {
    console.log('Handle Info');
  };

  const handleConfirm = () => {
    console.log('Handle Confirm');
  };

  const handleRefuse = () => {
    console.log('Handle Refuse');
  };

  return (
    <tr>
      <td className="col-4">
        <Link to="#link-to-user?" target="_blank">
          Username Usersurname
        </Link>
      </td>
      <td className="col-12">
        <Link to="#link-to-competition?" target="_blank">
          Competition name
        </Link>
      </td>
      <td>
        <div className="d-flex gap-1 flex-column flex-lg-row flex-md-row align-end">
          <Button
            variant="outline-primary"
            className="align-content-center d-inline-flex"
            onClick={handleInfo}
          >
            <span className="material-icons">visibility</span>
          </Button>
          <Button
            variant="outline-success"
            className="align-content-center d-inline-flex"
            onClick={handleConfirm}
          >
            <span className="material-icons">done</span>
          </Button>
          <Button
            variant="outline-danger"
            className="align-content-center d-inline-flex"
            onClick={handleRefuse}
          >
            <span className="material-icons">close</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default AdminUserParticipationRequestPage;
