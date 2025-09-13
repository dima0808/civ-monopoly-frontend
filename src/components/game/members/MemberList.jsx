import './MemberList.scss';

import Member from './Member.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { leaveRoom } from '../../../http/requests/room.js';
import { pushNotification } from '../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../constants/notification.js';
import { useNavigate } from 'react-router-dom';
import { isUserLeaderCookies } from '../../../utils/room.js';

const MemberList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { room } = useSelector((state) => state.game);
  const { user } = useSelector((state) => state.auth);

  const onLeave = () => {
    leaveRoom()
      .then()
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
  };

  const displayLoading = () => {
    return (
      <div className="loading">
        <p className="loading--message">Loading...</p>
      </div>
    ); // TODO: make translation
  };

  const displayMembers = () => {
    const members = room.members;
    return members.map((member, index) => {
      return (
        <Member
          key={index}
          member={member}
          isLeader={index === 0}
          showKickButton={
            !room.isStarted && index !== 0 && isUserLeaderCookies(members, user)
          }
        />
      );
    });
  };

  const generateEmptySlots = () => {
    return Array.from({ length: room.memberLimit - room.members.length }).map(
      (_, index) => (
        <div key={index} className="not-player no-select">
          Available Slot
        </div>
      ),
    );
  };

  return (
    <section className="players">
      <div className="player-game">
        {room ? (
          <>
            {displayMembers()}
            {generateEmptySlots()}
          </>
        ) : (
          displayLoading()
        )}

        <div className="btns-player">
          <div className="flex-between">
            <button onClick={onLeave} className="leave-btn btn-in no-select">
              leave
            </button>
            <button
              onClick={() => navigate('/home')}
              className="btn-in no-select move-to-lobby-btn "
            >
              home
            </button>
          </div>

          <div className="flex-between">
            <button className="move-to-lobby-btn bc-light-green btn-in no-select">
              start
            </button>
          </div>
        </div>

        {/*<div className="turn-and-era">*/}
        {/*  <div className="torn-counter">1</div>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export default MemberList;
