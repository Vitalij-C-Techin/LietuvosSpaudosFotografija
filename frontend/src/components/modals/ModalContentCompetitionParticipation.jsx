import { Container, Card, Row, Col, Image, Button, Table, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModalContentCompetitionParticipation = ({ competition, onParticipate }) => {
  const [t] = useTranslation();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.competitionAbout')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{t('modal.competitionTitle')}</h5>
        <p>Nulla purus eleifendeu risus</p>
        <h5>{t('modal.competitionDescription')}</h5>
        <p>
          Donec in sapien dapibus, suscipit nibh nec, hendrerit augue. Nullam et sapien eleifend,
          tincidunt magna ac, maximus nulla. Sed eu lacus ac sapien placerat vestibulum eu et justo.
          Vivamus luctus felis nec enim suscipit, ut auctor dui luctus. Nulla purus nisl, eleifend
          eu risus at, accumsan tempor sem. Nullam dolor nisi, luctus sit amet erat eu,
        </p>
        <h5>{t('modal.competitionCategories')}</h5>
        <ul>
          <li>City</li>
          <li>Animals</li>
          <li>Sport</li>
        </ul>
        <h5>{t('modal.competitionDates')}</h5>
        <p>2024.03.01 - 2024.05.01</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="lsf-button" onClick={onParticipate}>
          {t('modal.participate')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalContentCompetitionParticipation;
