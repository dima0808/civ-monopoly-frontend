import './Lobby.scss';
import { createPortal } from 'react-dom';
import { useRef, useState } from 'react';
import { createRoom } from '../../http/requests/room.js';
import { pushNotification } from '../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../constants/notification.js';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CreateLobbyDialog = ({ isOpened, setIsOpened }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const [size, setSize] = useState(4);

  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

  const onClose = (event) => {
    event.preventDefault();
    setIsOpened(false);
  };

  const onCreate = (event) => {
    event.preventDefault();
    createRoom({
      name: nameRef.current.value,
      memberLimit: size,
      password: passwordRef.current.value || null,
    })
      .then(() => setIsOpened(false))
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
  };

  const handleSizeChange = (event) => {
    setSize(parseInt(event.target.value, 10));
  };

  const togglePassword = () => {
    setIsPasswordEnabled((prev) => {
      if (prev) passwordRef.current.value = '';
      return !prev;
    });
  };

  if (!isOpened) return null;

  return createPortal(
    <dialog open className="full-screen-div">
      <div className="lobby-dialog">
        <form>
          <label className="lobby-label">
            {t('lobby.dialogCreate.lobbyName')}
            <input
              ref={nameRef}
              type="text"
              className="lobby-input"
              required
              autoComplete="new-password"
            />
          </label>
          {t('lobby.dialogCreate.sizeLabel')}
          <div className="radio-buttons" onChange={handleSizeChange}>
            <input type="radio" id="size2" name="size" value={2} />
            <label htmlFor="size2">2</label>

            <input type="radio" id="size3" name="size" value={3} />
            <label htmlFor="size3">3</label>

            <input
              type="radio"
              id="size4"
              name="size"
              value={4}
              defaultChecked
            />
            <label htmlFor="size4">4</label>

            <input type="radio" id="size5" name="size" value={5} />
            <label htmlFor="size5">5</label>

            <input type="radio" id="size6" name="size" value={6} />
            <label htmlFor="size6">6</label>
          </div>
          <div className="private-lobby-settings">
            <div className="flex-between">
              <label className="lobby-label" htmlFor="input-password">
                {t('lobby.dialogCreate.password')}
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isPasswordEnabled}
                  onChange={togglePassword}
                />
                <span className="slider"></span>
              </label>
            </div>
            <input
              ref={passwordRef}
              disabled={!isPasswordEnabled}
              id="input-password"
              type="password"
              className="lobby-input"
              autoComplete="new-password"
            />
          </div>
          <button onClick={onCreate} className="dialog-submit">
            {t('lobby.dialogCreate.create')}
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

export default CreateLobbyDialog;
