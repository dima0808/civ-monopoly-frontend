import './NotificationList.scss';
import avatar from '../../images/avatar.png';

const MessageNotification = ({ message, isDisappearing }) => {
  return (
    <div
      className={`notification--item
    ${isDisappearing ? ' set__opacity' : ''}`}
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
