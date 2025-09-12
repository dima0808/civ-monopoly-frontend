import './Lobby.scss';
import avatarImg from '../../images/avatar.png';
import { Link } from 'react-router-dom';
import { kickMember } from '../../http/requests/room.js';
import { pushNotification } from '../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../constants/notification.js';
import { useDispatch } from 'react-redux';

const Member = ({ member, isLeader, showKickButton }) => {
  const dispatch = useDispatch();

  const onKick = () => {
    kickMember(member.reference)
      .then()
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
  };

  return (
    <div className="lobby__member">
      <div className={`lobby__member-avatar${isLeader ? ' leader' : ''}`}>
        <img
          src={avatarImg}
          className="lobby__member-avatar-img"
          alt="avatar"
        />
      </div>
      <Link to="/home" className="lobby__member-nickname">
        {member.username}
      </Link>
      {showKickButton && (
        <button onClick={onKick} className="kick-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="kick-svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Member;
