import './MemberList.scss';

import { useDispatch, useSelector } from 'react-redux';
import { kickMember } from '../../../http/requests/room.js';
import { pushNotification } from '../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../constants/notification.js';
import MemberSetupDialog from './MemberSetupDialog.jsx';
import { useState } from 'react';
import { LEADERS } from '../../../constants/game.js';

const Member = ({ member, isLeader, showKickButton }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMemberSetupOpened, setIsMemberSetupOpened] = useState(false);

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
    <div className={`player color-${member.color.toLowerCase()}`}>
      {isMemberSetupOpened && (
        <MemberSetupDialog
          member={member}
          setIsOpened={setIsMemberSetupOpened}
        />
      )}
      <div className={`player__div${isLeader ? ' leader' : ''}`}>
        <img
          className="player__div-img"
          src={LEADERS[member.civilization].src}
          alt="avatar"
        />
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
          {user?.username === member.username ? (
            <div
              onClick={() => setIsMemberSetupOpened((prev) => !prev)}
              className="civ-selector"
            >
              <button className="civ-member-choose-leader-btn">
                {LEADERS[member.civilization].civilization}
              </button>
            </div>
          ) : (
            <p className="civ-leader-p">
              {LEADERS[member.civilization].civilization}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Member;
