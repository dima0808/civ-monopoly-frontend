import './Lobby.scss';
import { createPortal } from 'react-dom';
import { joinRoom } from '../../http/requests/room.js';
import { useRef } from 'react';

const JoinLobbyDialog = ({ isOpen, setIsOpened, reference }) => {
  const passwordRef = useRef(null);

  const onClose = (event) => {
    event.preventDefault();
    setIsOpened(false);
  };

  const onJoin = (event) => {
    event.preventDefault();
    joinRoom({
      reference: reference,
      password: passwordRef.current.value || '',
    })
      .then(() => setIsOpened(false))
      .catch((e) => {
        console.error('Error joining room:', e); // TODO: move to notifications
      });
  };

  if (!isOpen) return null;

  return createPortal(
    <dialog open className="full-screen-div">
      <div className="lobby-dialog lobby-dialog-join">
        <form>
          <label>
            Password:
            <input
              ref={passwordRef}
              type="password"
              required
              autoComplete="new-password"
            />
          </label>

          <button onClick={onJoin} className="dialog-submit">
            Join
          </button>

          <button onClick={onClose} className="dialog-close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="kick-svg2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </form>
      </div>
    </dialog>,
    document.getElementById('modal'),
  );
};

export default JoinLobbyDialog;
