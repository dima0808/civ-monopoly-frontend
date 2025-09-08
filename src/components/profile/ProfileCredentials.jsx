import './Profile.scss';

const ProfileCredentials = () => {
  return (
    <div className="profile-left-bottom">
      <label className="profile-label">
        Nickname:
        <input
          type="text"
          className="profile-input"
          defaultValue="nickname"
          required
          autoComplete="new-password"
        />
      </label>
      <label className="profile-label">
        E-mail:
        <input
          type="email"
          className="profile-input"
          defaultValue="example@email.com"
          required
          autoComplete="new-password"
        />
      </label>
      <label className="profile-label">
        Change Password:
        <input
          type="password"
          className="profile-input"
          required
          autoComplete="new-password"
        />
      </label>
      <label className="profile-label">
        Repeat the Password:
        <input
          type="password"
          className="profile-input"
          required
          autoComplete="new-password"
        />
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
          Update profile
        </button>
      </div>
    </div>
  );
};
export default ProfileCredentials;
