import { useTranslation } from 'react-i18next';

import MessageTemplate from './TemplateMessage';

const EmptyMessage = () => {
  const [t] = useTranslation();

  return (
    <>
      <MessageTemplate message={t('notificationMessages.empty')} />
    </>
  );
};

export default EmptyMessage;
