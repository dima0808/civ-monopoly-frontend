import './Profile.scss';
import { useTranslation } from 'react-i18next';

const Achievements = () => {
  const { t } = useTranslation();
  return (
    <div className="profile-right-bottom">
      <p className="profile-right-bottom-p">
        {t('profile.achievements')} 12/24
      </p>

      <div className="profile-right-bottom-div scroll"></div>
    </div>
  );
};
export default Achievements;
