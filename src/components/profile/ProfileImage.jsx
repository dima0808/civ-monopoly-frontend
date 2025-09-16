import './Profile.scss';

import { HTTP_BASE_URL } from '../../constants/api.js';
import { useRef, useState } from 'react';
import { changeAvatar } from '../../http/requests/user.js';
import { pushNotification } from '../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../constants/notification.js';
import { useDispatch } from 'react-redux';

const ProfileImage = ({ user }) => {
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const fileInputRef = useRef(null);

  const onChangeAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      changeAvatar(e.target.files[0])
        .then((data) => setAvatarUrl(data.avatarUrl))
        .catch((e) => {
          dispatch(
            pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
          );
        });
    }
  };

  return (
    <div className="profile-left-top">
      <div className="violet-square">
        <img
          src={`${HTTP_BASE_URL}${avatarUrl}`}
          className="profile-left-top-img"
          alt="avatar"
        />

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button onClick={onChangeAvatarClick} className="profile-left-top-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="profile-left-top-svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default ProfileImage;
