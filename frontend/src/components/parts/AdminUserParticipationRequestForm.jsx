import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image, Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoadingMessage from '../messages/LoadingMessage';
import EmptyMessage from '../messages/EmptyMessage';
import Config from '../config/Config';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import User from '../utils/User';
import Competition from '../utils/Competition';
import Pagination from '../parts/Pagination';

const AdminUserParticipationRequestForm = () => {
  const [t] = useTranslation();
  const { getTokenHeader } = useAuth();

  const [requestData, setRequestData] = useState(null);
  const [userRequestsPage, setUserRequestsPage] = useState(0);

  const [userRequests, setUserRequests] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const updateList = () => {
    setIsLoading(true);

    let url = Config.apiDomain + Config.endpoints.participation.pending;
    url = url.replace('{page}', userRequestsPage);

    const cfg = {
      headers: {
        ...(getTokenHeader() || {})
      }
    };

    axios
      .get(url, cfg)
      .then((response) => {
        setRequestData(response.data);

        if (!response.data.empty) {
          setUserRequests(response.data.content);

          return;
        }

        if (0 < userRequestsPage) {
          setUserRequestsPage(userRequestsPage - 1);

          return;
        }

        setUserRequests(null);
      })
      .catch((error) => {
        console.error('Error: ', error);

        setUserRequests(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onPageChange = (e, page) => {
    setUserRequestsPage(page - 1);
  };

  const updateRequestStatus = (request, status) => {
    let url = Config.apiDomain + Config.endpoints.participation.update;
    url = url.replace('{uuid}', request.request.uuid);

    const body = {
      status
    };

    const cfg = {
      headers: {
        ...(getTokenHeader() || {})
      }
    };

    axios
      .put(url, body, cfg)
      .then((response) => {
        updateList();
      })
      .catch((e) => {
        console.error('Error: ', e);
      });
  };

  const onPermit = (request) => {
    updateRequestStatus(request, 'PERMIT');
  };

  const onReject = (request) => {
    updateRequestStatus(request, 'REJECT');
  };

  useEffect(() => {
    updateList();
  }, [userRequestsPage]);

  return (
    <>
      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h3>{t('adminUserParticipationRequestPage.title')}</h3>
        </Card>
      </Container>

      {!!isLoading && <LoadingMessage />}

      {!!!isLoading && !!!userRequests && <EmptyMessage />}

      {!!!isLoading && !!userRequests && (
        <UserRequestList userRequests={userRequests} onPermit={onPermit} onReject={onReject} />
      )}

      {!!requestData && (
        <Pagination totalPages={requestData.totalPages} onPageChange={onPageChange} />
      )}
    </>
  );
};

const UserRequestList = ({ userRequests, onPermit, onReject }) => {
  const [t] = useTranslation();

  const list = userRequests.map((userRequest, i) => {
    return (
      <UserRequestSingle
        userRequest={userRequest}
        onPermit={onPermit}
        onReject={onReject}
        key={i}
      />
    );
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

const UserRequestSingle = ({ userRequest, onPermit, onReject }) => {
  const [t] = useTranslation();

  const user = new User(userRequest.user);
  const competition = new Competition(userRequest.competition.data);

  const handleInfo = () => {
    console.log('Handle Info', user, competition);
  };

  const handleConfirm = () => {
    onPermit(userRequest);
  };

  const handleRefuse = () => {
    onReject(userRequest);
  };

  return (
    <tr>
      <td className="col-4">
        <Link to={user.getAdminUrl()} target="_blank">
          {user.getName()} {user.getSurname()}
        </Link>
      </td>
      <td className="col-12">
        <Link to={competition.getAdminUrl()} target="_blank">
          {competition.getName()}
        </Link>
      </td>
      <td>
        <div className="d-flex gap-1 flex-column flex-lg-row flex-md-row align-end">
          <Button
            variant="outline-primary"
            className="align-content-center d-inline-flex d-none "
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

export default AdminUserParticipationRequestForm;
