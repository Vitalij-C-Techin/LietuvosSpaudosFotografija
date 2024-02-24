import { useTranslation } from 'react-i18next';

import MessageTemplate from './TemplateMessage';

const LoadingMessage = () => {
  const [t] = useTranslation();

  return (
    <>
      <MessageTemplate message={t('notificationMessages.loading') + '...'} />
    </>
  );
};

export default LoadingMessage;
