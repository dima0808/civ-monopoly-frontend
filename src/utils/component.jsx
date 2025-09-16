import { useTranslation } from 'react-i18next';

export const DisplayLoading = () => {
  const { t } = useTranslation();

  return (
    <div className="loading">
      <p className="loading--message loading--message--bigger">
        {t('chat.loading')}
      </p>
    </div>
  );
};

export const DisplayError = ({ error }) => {
  return (
    <div className="loading">
      <p className="loading--message loading--message--bigger">{error}</p>
    </div>
  );
};
