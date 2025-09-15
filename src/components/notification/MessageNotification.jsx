import './NotificationList.scss';
import avatar from '../../images/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenedChat, turnOnChat } from '../../store/slices/chatSlice.js';
import { getChatByUsernames } from '../../http/requests/chatPrivate.js';
import {
  pushNotification,
  removeNotification,
} from '../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../constants/notification.js';

const MessageNotification = ({ id, message, isDisappearing }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onClickOnNotification = () => {
    dispatch(turnOnChat());
    getChatByUsernames(message.sender, user.username)
      .then((data) => dispatch(setOpenedChat(data)))
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
    dispatch(removeNotification(id));
  };

  return (
    <div
      onClick={onClickOnNotification}
      className={`notification--item${isDisappearing ? ' set__opacity' : ''}`}
    >
      <img src={avatar} className="notification--avatar" alt="avatar" />

      <div className="notification--message">
        <p className="notification--name">{message.sender}</p>
        <p className="notification--p">{message.message}</p>
      </div>
    </div>
  );
};
export default MessageNotification;
