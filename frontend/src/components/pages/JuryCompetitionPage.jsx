import { useEffect, useState } from 'react';
import axios from 'axios';

import { Container, Card, Row, Col, Button, Table, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingMessage from '../messages/LoadingMessage';
import EmptyMessage from '../messages/EmptyMessage';
import { useAuth } from '../context/AuthContext';
import Config from '../config/Config';
import Competition from '../utils/Competition';
import Photo from '../utils/Photo';
import Category from '../utils/Category';

let UUID = 0;

const JuryCompetitionPage = () => {
  const params = useParams();
  const { getTokenHeader } = useAuth();
  const [t] = useTranslation();

  const competitionUuid = (UUID = params.uuid);

  const [competition, setCompetition] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const hasCategories = () => {
    if (!!!competition) {
      return false;
    }

    if (!!!competition.category_list) {
      return false;
    }

    if (!!!competition.category_list.length) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    setIsLoading(true);

    let url = Config.apiDomain + Config.endpoints.jury.getSingle;
    url = url.replace('{uuid}', competitionUuid);

    const cfg = {
      headers: {
        ...(getTokenHeader() || {})
      }
    };

    axios
      .get(url, cfg)
      .then((response) => {
        setCompetition(response.data);
      })
      .catch((error) => {
        console.error('Error: ', error);

        setCompetition(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Container className="justify-content-xl-center my-5">
        <Card className="image-header-text">
          <h3>{t('juryPage.competitionTitle')}</h3>
        </Card>
      </Container>

      {!!isLoading && <LoadingMessage />}

      {!!!isLoading && (
        <>
          <CompetitionInfo competition={competition} />

          {!hasCategories() && (
            <>
              <EmptyMessage />
            </>
          )}

          {hasCategories() && (
            <>
              <CategoryList categoryList={competition.category_list} />
            </>
          )}
        </>
      )}
    </>
  );
};

const CompetitionInfo = ({ competition }) => {
  if (!!!competition) {
    return;
  }

  const [t] = useTranslation();

  const c = new Competition(competition);
  const p = new Photo(competition.photo);

  return (
    <Container>
      <Card className="lsf-admin-competition-card my-3">
        <Card.Body className="p-0">
          <Row className="m-0">
            <Col xs="12" md="4" lg="3" className="p-0 p-md-3 p-lg-3 bg-light">
              <Image
                src={p.getPhotoSmallUrl()}
                alt="competition photo"
                className="lsf-image-cover"
              />
            </Col>
            <Col className="d-flex flex-column p-3">
              <Card.Title className="mb-4">{c.getName()}</Card.Title>
              <Card.Text className="flex-fill">{c.getDescription()}</Card.Text>
              <Card.Text>
                {t('adminCompetitionPage.competitionDates')}: {c.getActiveDates()}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

const CategoryList = ({ categoryList }) => {
  const [t] = useTranslation();

  const list = categoryList.map((category, i) => {
    return <CategorySingle category={category} key={i} />;
  });

  return (
    <Container className="justify-content-xl-center">
      <Table responsive hover striped className="lsf-table">
        <thead className="table-light">
          <tr>
            <th className="col-4">{t('juryPage.categoryListTitle')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </Table>
    </Container>
  );
};

const CategorySingle = ({ category }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const c = new Category(category);

  const handleSelect = () => {
    navigate('/jury-competition/' + UUID + '/category/' + c.getUuid());
  };

  return (
    <tr>
      <td className="col-12">
        {c.getName()}
        <div>{c.getDescription()}</div>
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

export default JuryCompetitionPage;
