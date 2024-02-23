import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image, Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TESTuserRequests = [
  { id_user: '1', name: 'Toma', surname: 'Jasius', competition_name: 'Kaciukai' },
  {
    id_user: '2',
    name: 'Violeta',
    surname: 'Lina',
    competition_name:
      'Suniukai mieste su drabuziais ir gamtoje. Suniukai mieste su drabuziais ir gamtoje. Suniukai mieste su drabuziais ir gamtoje. '
  },
  { id_user: '3', name: 'Julius', surname: 'Po', competition_name: 'Kaciukai' }
];

const AdminUserParticipationRequestPage = () => {
  const [t] = useTranslation();

  const [userRequests, setUserRequests] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO remove this (only for test)

    //return;

    setTimeout(() => {
      setUserRequests(TESTuserRequests);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h3>{t('adminCompetitionPage.title')}</h3>
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
      <Table responsive hover striped className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Participator</th>
            <th>Competition</th>
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

  const handleView = () => {
    console.log('Competition view');
  };

  return (
    <tr>
      <td>
        {userRequest.name} {userRequest.surname}
      </td>
      <td>{userRequest.competition_name}</td>
      <td align="right" className="d-flex gap-1 flex-column flex-lg-row flex-md-row">
        <Button variant="outline-primary" className="align-content-center d-inline-flex">
          <span className="material-icons">visibility</span>
        </Button>
        <Button variant="outline-success" className="align-content-center d-inline-flex">
          <span className="material-icons">done</span>
        </Button>
        <Button variant="outline-danger" className="align-content-center d-inline-flex">
          <span className="material-icons">close</span>
        </Button>
      </td>
    </tr>
  );
};

const LoadingMessage = () => {
  const [t] = useTranslation();

  return (
    <>
      <Container className="justify-content-xl-center my-3 py-3">
        <Card className="">
          <h4>{t('adminCompetitionPage.loading')}...</h4>
        </Card>
      </Container>
    </>
  );
};

const EmptyMessage = () => {
  const [t] = useTranslation();

  return (
    <>
      <Container className="justify-content-xl-center m-3 py-3">
        <Card>
          <h4>{t('adminCompetitionPage.empty')}</h4>
        </Card>
      </Container>
    </>
  );
};

export default AdminUserParticipationRequestPage;
