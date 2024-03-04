import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image, Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ModalInfo from '../modals/ModalInfo';

import LoadingMessage from '../messages/LoadingMessage';
import EmptyMessage from '../messages/EmptyMessage';
import ModalContentCompetitionParticipation from '../modals/ModalContentCompetitionParticipation';

const UserCompetitionsRequestPage = () => {
  const [t] = useTranslation();

  const [competitions, setCompetitions] = useState(null);
  const [competition, setCompetition] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onDetails = (competition) => {
    console.log('Competition details');

    setCompetition(competition);
  };

  const onParticipate = () => {
    console.log('Request to participate');

    setCompetition(null);
  };

  const onModalClose = () => {
    setCompetition(null);
  };

  const ModalArgs = {
    show: !!competition,
    onClose: onModalClose
  };

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
          <h3>{t('userCompetitionPage.participateCompetition')}</h3>
        </Card>
      </Container>

      {!!isLoading && <LoadingMessage />}

      {!!!isLoading && !!!competitions && <EmptyMessage />}

      {!!!isLoading && !!competitions && (
        <CompetitionList competitions={competitions} onDetails={onDetails} />
      )}

      <ModalInfo args={ModalArgs}>
        <ModalContentCompetitionParticipation
          competition={competition}
          onParticipate={onParticipate}
        />
      </ModalInfo>
    </>
  );
};

const CompetitionList = ({ competitions, onDetails }) => {
  const [t] = useTranslation();

  const list = competitions.map((competition, i) => {
    return <CompetitionSingle competition={competition} onDetails={onDetails} key={i} />;
  });

  return (
    <Container className="justify-content-xl-center">
      <Table responsive hover striped className="lsf-table">
        <thead className="table-light">
          <tr>
            <th className="col-4">{t('userCompetitionPage.competitionName')}</th>
            <th className="col-12">{t('userCompetitionPage.competitionCategories')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </Table>
    </Container>
  );
};

const CompetitionSingle = ({ competition, onDetails }) => {
  return (
    <tr>
      <td className="col-4">
        Competition name
        <div>Date: 2024.01.01 - 2024.03.01 </div>
      </td>
      <td className="col-12">Categories</td>
      <td>
        <div className="d-flex gap-1 flex-column flex-lg-row flex-md-row align-end">
          <Button
            variant="outline-primary"
            className="align-content-center d-inline-flex"
            onClick={onDetails}
          >
            <span className="material-icons">visibility</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default UserCompetitionsRequestPage;
