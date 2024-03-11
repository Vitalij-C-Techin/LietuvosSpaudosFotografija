import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminCompetitionsListForm = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { getTokenHeader } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompetitions = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/v1/competition/all/${page}`, {
        headers: getTokenHeader()
      });
      setCompetitions(response.data.content);
    } catch (error) {
      console.log('error fetching competition', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions(1);
  }, []);

  const handleView = () => {
    navigate('/edit-competition');
  };

  const handleViewRequest = () => {
    navigate('/admin-user-participation-requests');
  };

  const handleCreateCompetition = () => {
    navigate('/create-competition');
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h3>{t('adminCompetitionPage.title')}</h3>
        </Card>
      </Container>
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
      {competitions.map((competition, index) => (
        <Card key={index} className="lsf-admin-competition-card my-3">
          <Card.Body className="p-0">
            <Row className="m-0">
              <Col className="d-flex flex-column p-3">
                {/* Uncomment and modify this section if your competition object has a photo property */}
                {/* <Col xs="12" md="4" lg="3" className="p-0 p-md-3 p-lg-3 bg-light">
                  <Image
                    src={competition.photo}
                    alt="competition photo"
                    className="lsf-image-cover"
                  />
                </Col> */}
                <Card.Title className="mb-4">
                  {competition.nameEn}/{competition.nameLt}
                </Card.Title>
                <Card.Text className="flex-fill">{competition.descriptionEn}</Card.Text>
                <Card.Text className="flex-fill">{competition.descriptionLt}</Card.Text>
                <Card.Text>
                  {t('adminCompetitionPage.competitionStartDate')} {competition.startDate}
                </Card.Text>
                <Card.Text>
                  {t('adminCompetitionPage.competitionEndDate')} {competition.endDate}
                </Card.Text>
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
      ))}
    </>
  );
};

export default AdminCompetitionsListForm;
