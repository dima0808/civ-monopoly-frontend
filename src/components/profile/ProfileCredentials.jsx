import './Profile.scss';
import { useTranslation } from 'react-i18next';

const ProfileCredentials = ({ user }) => {
  const { t } = useTranslation();
  return (
    <div className="profile-left-bottom">
      <label className="profile-label">
        {t('profile.username')}
        <input
          type="text"
          className="profile-input"
          defaultValue={user.username}
          disabled={true}
        />
      </label>
      <label className="profile-label">
        {t('profile.changePassword')}
        <input type="password" className="profile-input" />
      </label>
      <label className="profile-label">
        {t('profile.repeatPassword')}
        <input type="password" className="profile-input" />
      </label>

      <div className="flex-between">
        <button className="reverse-btn profile-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="reverse-btn-svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
        <button className="update-profile-btn profile-btn">
          {t('profile.updateProfile')}
        </button>
      </div>
    </div>
  );
};
export default ProfileCredentials;
