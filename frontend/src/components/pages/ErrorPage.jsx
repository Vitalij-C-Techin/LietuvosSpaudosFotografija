import { useTranslation } from 'react-i18next';

import { Container } from 'react-bootstrap';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container className="pb-5">
        <h3>{t('Error')}</h3>
      </Container>
    </>
  );
};

export default ErrorPage;
