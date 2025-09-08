import './styles.css';
import { createPortal } from 'react-dom';

const JoinLobbyDialog = ({ isOpen }) => {
  if (!isOpen) return null;

  return createPortal(
    <dialog open className="full-screen-div">
      <div className="lobby-dialog lobby-dialog-join">
        <form>
          <label>
            Password:
            <input type="password" required autoComplete="new-password" />
          </label>
          <button type="submit" className="dialog-submit">
            Join
          </button>
          <button type="button" className="dialog-close">
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
