import './MemberList.scss';

import Member from './Member.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { leaveRoom } from '../../../http/requests/room.js';
import { pushNotification } from '../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../constants/notification.js';
import { useNavigate, useParams } from 'react-router-dom';
import { isUserInRoom, isUserLeaderCookies } from '../../../utils/room.js';
import { useCallback, useEffect, useRef } from 'react';
import { getStompClient } from '../../../store/slices/wsSlice.js';
import { setRoom, updateMember } from '../../../store/slices/gameSlice.js';
import { startGame } from '../../../http/requests/game.js';
import { useTranslation } from 'react-i18next';

const MemberList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reference } = useParams();
  const { room } = useSelector((state) => state.game);
  const { user } = useSelector((state) => state.auth);
  const wsConnected = useSelector((state) => state.ws.connected);

  const userRef = useRef(user);
  const roomRef = useRef(room);

  const onRoomMessageReceived = useCallback(
    (wsMessage) => {
      const {
        room: updatedRoom,
        member: updatedMember,
        type,
      } = JSON.parse(wsMessage.body);

      switch (type) {
        case 'KICK':
          if (
            isUserInRoom(roomRef.current.members, userRef.current) &&
            !isUserInRoom(updatedRoom.members, userRef.current)
          ) {
            navigate('/home');
          }
          dispatch(setRoom(updatedRoom));
          break;
        case 'JOIN':
        case 'LEAVE':
          dispatch(setRoom(updatedRoom));
          break;
        case 'DELETE':
          navigate('/home');
          break;
        case 'CHANGE_CIVILIZATION':
        case 'CHANGE_COLOR':
          dispatch(updateMember(updatedMember));
          break;
      }
    },
    [dispatch, navigate],
  );

  useEffect(() => {
    const client = getStompClient();
    if (!client || !wsConnected) return;

    const subscription = client.subscribe(
      '/topic/rooms/' + reference,
      onRoomMessageReceived,
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [onRoomMessageReceived, reference, wsConnected]);

  const onLeave = () => {
    leaveRoom()
      .then(() => navigate('/home'))
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
  };

  const onStartGame = () => {
    startGame()
      .then()
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
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
          {t('lobby.availableSlot')}
        </div>
      ),
    );
  };

  const displayBottomPanel = () => {
    return (
      <>
        {isUserInRoom(room.members, user) && !room.isStarted && (
          <div className="btns-player">
            <div className="flex-between">
              <button onClick={onLeave} className="leave-btn btn-in no-select">
                {t('lobby.leave')}
              </button>
              <button
                onClick={() => navigate('/home')}
                className="btn-in no-select move-to-lobby-btn "
              >
                {t('lobby.home')}
              </button>
            </div>

            {isUserLeaderCookies(room.members, user) && (
              <div className="flex-between">
                <button
                  onClick={onStartGame}
                  className="move-to-lobby-btn bc-light-green btn-in no-select"
                >
                  {t('lobby.start')}
                </button>
              </div>
            )}
          </div>
        )}

        {room.isStarted && (
          <div className="turn-and-era">
            <div className="torn-counter">{room.turn}</div>
          </div>
        )}
      </>
    );
  };

  return (
    <section className="players">
      <div className="player-game">
        {displayMembers()}
        {generateEmptySlots()}
        {displayBottomPanel()}
      </div>
    </section>
  );
};

export default MemberList;
