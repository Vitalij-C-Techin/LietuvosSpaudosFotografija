import { useEffect, useState } from 'react';
import axios from 'axios';

import { Container, Card, Row, Col, Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LoadingMessage from '../messages/LoadingMessage';
import EmptyMessage from '../messages/EmptyMessage';
import { useAuth } from '../context/AuthContext';
import Config from '../config/Config';
import Competition from '../utils/Competition';
import Pagination from '../parts/Pagination';

const UserCompetitionsListPage = () => {
  const [t] = useTranslation();
  const { getTokenHeader } = useAuth();

  const [requestData, setRequestData] = useState(null);
  const [competitionsPage, setCompetitionsPage] = useState(0);

  const [competitions, setCompetitions] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const onPageChange = (e, page) => {
    setCompetitionsPage(page - 1);
  };

  useEffect(() => {
    setIsLoading(true);

    let url = Config.apiDomain + Config.endpoints.competitions.userActive;
    url = url.replace('{page}', competitionsPage);

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
          setCompetitions(response.data.content);

          return;
        }

        setCompetitions(null);
      })
      .catch((error) => {
        console.error('Error: ', error);

        setCompetitions(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [competitionsPage]);

  return (
    <>
      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h3>{t('userCompetitionPage.title')}</h3>
        </Card>
      </Container>

      <ActionList />

      {!!isLoading && <LoadingMessage />}

      {!!!isLoading && !!!competitions && <EmptyMessage />}

      {!!!isLoading && !!competitions && <CompetitionList competitions={competitions} />}

      {!!requestData && (
        <Pagination totalPages={requestData.totalPages} onPageChange={onPageChange} />
      )}
    </>
  );
};

const CompetitionList = ({ competitions }) => {
  const [t] = useTranslation();

  const list = competitions.map((competition, i) => {
    return <CompetitionSingle competition={competition} key={i} />;
  });

  return (
    <Container className="justify-content-xl-center">
      <Table responsive hover striped className="lsf-table">
        <thead className="table-light">
          <tr>
            <th className="col-4">{t('userCompetitionPage.competitionName')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </Table>
    </Container>
  );
};

const CompetitionSingle = ({ competition }) => {
  const [t] = useTranslation();

  const c = new Competition(competition);

  const handleSelect = () => {
    console.log('Handle Info');
  };

  return (
    <tr>
      <td className="col-12">
        {c.getName()}
        <div>{c.getActiveDates()}</div>
      </td>
      <td>
        <div className="d-flex gap-1 flex-column flex-lg-row flex-md-row align-end">
          <Button
            variant="outline-primary"
            className="align-content-center d-inline-flex"
            onClick={handleSelect}
          >
            <span className="material-icons">visibility</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

const ActionList = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const handleParticipate = () => {
    navigate('/user-competition-request');
  };

  return (
    <>
      <Container className="justify-content-xl-center my-3">
        <Row className="justify-content-end gap-2">
          <Col xs="12" lg="3">
            <Button className="lsf-button w-100" onClick={handleParticipate}>
              {t('userCompetitionPage.participateCompetition')}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserCompetitionsListPage;
