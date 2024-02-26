import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image, Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UserCompetitionsRequestPage = () => {
  const [t] = useTranslation();

  const [competitions, setCompetitions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO remove this (only for test)

    //return;

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

      {!!!isLoading && !!competitions && <CompetitionList competitions={competitions} />}
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
            <th className="col-4">{t('adminUserParticipationRequestPage.participator')}</th>
            <th className="col-auto">{t('adminUserParticipationRequestPage.competition')}</th>
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

  const handleDetails = () => {
    console.log('Handle Info');
  };

  return (
    <tr>
      <td className="col-4">
        <Link to="#link-to-user?" target="_blank">
          Competition name
        </Link>
      </td>
      <td className="col-auto">
        <Link to="#link-to-competition?" target="_blank">
          Other info???
        </Link>
      </td>
      <td className="col-1">
        <div className="d-flex gap-1 flex-column flex-lg-row flex-md-row align-end">
          <Button
            variant="outline-primary"
            className="align-content-center d-inline-flex"
            onClick={handleDetails}
          >
            <span className="material-icons">More Details</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default UserCompetitionsRequestPage;
