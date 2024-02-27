import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LoadingMessage from '../parts/LoadingMessage';
import EmptyMessage from '../parts/EmptyMessage';

const AdminCompetitionsListPage = () => {
  const [t] = useTranslation();

  const [competitions, setCompetitions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCompetitions([{}, {}, {}]);
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

      <ActionList />

      {!!isLoading && <LoadingMessage />}

      {!!!isLoading && !!!competitions && <EmptyMessage />}

      {!!!isLoading && !!competitions && <CompetitionList competitions={competitions} />}
    </>
  );
};

const CompetitionList = ({ competitions }) => {
  const [t] = useTranslation();

  const list = competitions.map((competition, i) => {
    return <CompetitionSingle competition={competition} key={i} />;
  });

  return <Container className="justify-content-xl-center">{list}</Container>;
};

const CompetitionSingle = ({ competition }) => {
  const [t] = useTranslation();

  const handleView = () => {
    console.log('Competition view');
  };

  return (
    <Card className="lsf-admin-competition-card my-3">
      <Card.Body className="p-0">
        <Row className="m-0">
          <Col xs="12" md="4" lg="3" className="p-0 p-md-3 p-lg-3 bg-light">
            <Image
              src="/src/tmp/placeholder-500.jpg"
              alt="competition photo"
              className="lsf-image-cover"
            />
          </Col>
          <Col className="d-flex flex-column p-3">
            <Card.Title className="mb-4">Competition title</Card.Title>
            <Card.Text className="flex-fill">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum
              dolor sit amet, consectetur adipiscing elit.
            </Card.Text>
            <Card.Text>{t('adminCompetitionPage.competitionDates')}: 2023-2024</Card.Text>
            <Card.Link className="d-flex justify-content-end">
              <Col xs="12" sm="12" md="6" lg="3">
                <Button className="lsf-button w-100" onClick={handleView}>
                  {t('adminCompetitionPage.competitionView')}
                </Button>
              </Col>
            </Card.Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const ActionList = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const handleViewRequest = () => {
    navigate('/admin-user-participation-requests');
  };

  const handleCreateCompetition = () => {
    console.log('Create competition button');
  };

  return (
    <>
      <Container className="justify-content-xl-center my-3">
        <Row className="justify-content-end gap-2">
          <Col xs="12" lg="3">
            <Button className="lsf-button w-100" onClick={handleViewRequest}>
              {t('adminCompetitionPage.viewParticipantRequest')}
            </Button>
          </Col>
          <Col xs="12" lg="3">
            <Button className="lsf-button w-100" onClick={handleCreateCompetition}>
              {t('adminCompetitionPage.createCompetition')}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminCompetitionsListPage;
