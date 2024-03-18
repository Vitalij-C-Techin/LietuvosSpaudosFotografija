import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Container, Card, Button, Table } from 'react-bootstrap';

import Config from '../config/Config';
import { useAuth } from '../context/AuthContext';
import Competition from '../utils/Competition';

import LoadingMessage from '../messages/LoadingMessage';
import EmptyMessage from '../messages/EmptyMessage';

import ModalInfo from '../modals/ModalInfo';
import ModalContentCompetitionParticipation from '../modals/ModalContentCompetitionParticipation';
import Pagination from '../parts/Pagination';
import Category from '../utils/Category';

const UserCompetitionsRequestPage = () => {
  const [t] = useTranslation();
  const { getUserData, getTokenHeader } = useAuth();

  const [requestData, setRequestData] = useState(null);
  const [competitionsPage, setCompetitionsPage] = useState(0);

  const [competitions, setCompetitions] = useState(null);
  const [competition, setCompetition] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState(false);

  const updateList = () => {
    setIsLoading(true);

    let url = Config.apiDomain + Config.endpoints.competitions.userParticipate;
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

        if (0 < competitionsPage) {
          setCompetitionsPage(competitionsPage - 1);

          return;
        }

        setCompetitions(null);
      })
      .catch((error) => {
        console.error('Error: ', error);

        setCompetitions(null);
        setCompetition(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onPageChange = (e, page) => {
    setCompetitionsPage(page - 1);
  };

  const onDetails = (competition) => {
    setCompetition(competition);
    setModalState(true);
  };

  const onParticipate = (competition) => {
    const url = Config.apiDomain + Config.endpoints.participation.create;

    const body = {
      user_uuid: getUserData().uuid,
      competition_uuid: competition.uuid
    };

    const cfg = {
      headers: {
        ...(getTokenHeader() || {})
      }
    };

    axios
      .post(url, body, cfg)
      .then((response) => {
        setModalState(false);

        updateList();
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const onModalClose = () => {
    setModalState(false);
  };

  useEffect(() => {
    updateList();
  }, [competitionsPage]);

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

      {!!requestData && (
        <Pagination totalPages={requestData.totalPages} onPageChange={onPageChange} />
      )}

      <ModalInfo show={modalState} onHide={onModalClose}>
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
  const com = new Competition(competition.competition);

  const categoryList = competition.categories.map((categoryData, i) => {
    const category = new Category(categoryData);

    return <div key={i}>{category.getName()}</div>;
  });

  const handleOnDetails = () => {
    onDetails({
      ...competition.competition,
      categories: competition.categories
    });
  };

  return (
    <tr>
      <td className="col-4">
        {com.getName()}
        <div>
          {com.getStartDate()} - {com.getEndDate()}
        </div>
      </td>
      <td className="col-12">{categoryList}</td>
      <td>
        <div className="d-flex gap-1 flex-column flex-lg-row flex-md-row align-end">
          <Button
            variant="outline-primary"
            className="align-content-center d-inline-flex"
            onClick={handleOnDetails}
          >
            <span className="material-icons">visibility</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default UserCompetitionsRequestPage;
