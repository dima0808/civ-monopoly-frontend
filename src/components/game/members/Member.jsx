import './MemberList.scss';

import aztecImg from '../../../images/leader_aztec_montezuma.png';
import { useDispatch } from 'react-redux';
import { kickMember } from '../../../http/requests/room.js';
import { pushNotification } from '../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../constants/notification.js';

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
    <div className={`player color-${member.color}`}>
      <div className={`player__div${isLeader ? ' leader' : ''}`}>
        <img src={aztecImg} className="player__div-img" alt="avatar" />
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

      <div className="player__stats">
        <h2 className="player__stats-h2">{member.username}</h2>

        <div className="player-stats-grid">
          <div className="civ-selector">
            <button className="civ-button">{member.civilization}</button>
          </div>

          <div className="color-selector">
            <button className={`color-button color-${member.color}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
