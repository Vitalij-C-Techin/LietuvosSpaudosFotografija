import { Container, Card, Row, Col, Image, Button, Table, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Competition from '../utils/Competition';

const ModalContentCompetitionParticipation = ({ competition, onParticipate }) => {
  const [t] = useTranslation();

  const c = new Competition(competition);

  const handleOnParticiapte = () => {
    onParticipate(competition);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.competitionAbout')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{t('modal.competitionTitle')}</h5>
        <p>{c.getName()}</p>
        <h5>{t('modal.competitionDescription')}</h5>
        <p>{c.getDescription()}</p>
        <h5>{t('modal.competitionCategories')}</h5>
        <ul>
          <li>City</li>
          <li>Animals</li>
          <li>Sport</li>
        </ul>
        <h5>{t('modal.competitionDates')}</h5>
        <p>{c.getActiveDates()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="lsf-button" onClick={handleOnParticiapte}>
          {t('modal.participate')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalContentCompetitionParticipation;
