import { Container, Card, Row, Col, Image, Button, Table, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Competition from '../utils/Competition';
import Category from '../utils/Category';

const ModalContentCompetitionParticipation = ({ competition, onParticipate }) => {
  const [t] = useTranslation();

  const c = new Competition(competition);

  let categoryList;

  if (!!competition.categories && !!competition.categories.length) {
    categoryList = competition.categories.map((categoryData, i) => {
      const category = new Category(categoryData);

      return <li key={i}>{category.getName()}</li>;
    });
  }

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

        {!!categoryList && (
          <>
            <h5>{t('modal.competitionCategories')}</h5>
            <ul>{categoryList}</ul>
          </>
        )}

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
