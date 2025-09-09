import './Lobby.scss';
import plusImg from '../../images/plus.png';
import viewImg from '../../images/view-icon.png';
import { Link } from 'react-router-dom';
import Member from './Member.jsx';
import { useSelector } from 'react-redux';
import { joinRoom, leaveRoom } from '../../http/requests/room.js';
import JoinLobbyDialog from './JoinLobbyDialog.jsx';
import { useState } from 'react';

const Lobby = ({ room }) => {
  const { user } = useSelector((state) => state.auth);

  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);

  const onJoin = () => {
    if (room.hasPassword) {
      setIsJoinDialogOpen(true);
      return;
    }

    joinRoom({
      reference: room.reference,
      password: '',
    })
      .then()
      .catch((e) => {
        console.error('Error joining room:', e); // TODO: move to notifications
      });
  };

  const onLeave = () => {
    leaveRoom()
      .then()
      .catch((e) => {
        console.error('Error leaving room:', e); // TODO: move to notifications
      });
  };

  const isUserLeaderCookies = () => {
    const members = room.members;
    if (members?.length === 0) {
      return false;
    }
    return user?.username === members[0]?.username;
  };

  const isUserInRoom = () => {
    const members = room.members;
    if (members?.length === 0) {
      return false;
    }
    return members.some((member) => member.username === user?.username);
  };

  const displayMembers = (members) => {
    return members.map((member, index) => {
      return (
        <Member
          key={index}
          member={member}
          isLeader={index === 0}
          showKickButton={
            !room.isStarted && index !== 0 && isUserLeaderCookies()
          }
        />
      );
    });
  };

  const generateEmptySlots = (num) => {
    return Array.from({ length: num }).map((_, index) => (
      <div className="lobby__member" key={index}>
        <button
          onClick={onJoin}
          disabled={isUserInRoom()}
          className="lobby__member-avatar lobby__member-btn"
        >
          <img
            src={plusImg}
            className="lobby__member-avatar-img"
            alt="avatar"
          />
        </button>
      </div>
    ));
  };

  return (
    <div className={`lobby__room${room.isStarted ? ' game-started' : ''}`}>
      <JoinLobbyDialog
        reference={room.reference}
        isOpen={isJoinDialogOpen}
        setIsOpened={setIsJoinDialogOpen}
      />
      <div className="lobby__header">
        <button className="lobby__name">{room.name}</button>
        {room.isStarted && (
          <div className="in-game-div">
            <p className="in-game-p">Game started</p>
            <Link to={`/game/${room.name}`} className="view-img-btn">
              <img src={viewImg} alt="viewImg" className="view-img" />
            </Link>
          </div>
        )}
      </div>

      <div className="lobby__members">
        {displayMembers(room.members)}
        {!room.isStarted &&
          generateEmptySlots(room.memberLimit - room.members.length)}
      </div>

      {isUserInRoom() && (
        <div className="in-room-btns">
          {!room.isStarted && (
            <div>
              <button onClick={onLeave} className="leave-btn btn-in">
                leave
              </button>
            </div>
          )}
          <Link
            to={`/game/${room.name}`}
            className="move-to-lobby-btn btn-in no-select"
          >
            Move to Lobby
          </Link>
        </div>
      )}
    </div>
  );
};

export default Lobby;
