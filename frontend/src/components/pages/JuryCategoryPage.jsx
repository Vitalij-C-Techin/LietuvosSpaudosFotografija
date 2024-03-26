import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const JuryCategoryPage = () => {
  const [t] = useTranslation();

  const params = useParams();
  const categoryUuid = params.uuid;

  return (
    <>
      <Container>Category UUID: {categoryUuid}</Container>
    </>
  );
};

export default JuryCategoryPage;
