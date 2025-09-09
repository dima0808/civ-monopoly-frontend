import './NotificationList.scss';
import avatar from '../../images/avatar.png';
const MessageNotification = () => {
  return (
    <div className="notification--item">
      <img src={avatar} className="notification--avatar" alt="avatar" />

      <div className="notification--messege">
        <p className="notification--name">dima</p>
        <p className="notification--p">
          Коли підемо циву?
          хахахахаахаххахахаххахахаххаахахахахаххахаххахахаххахахахахахахаххахах
        </p>
      </div>
    </div>
  );
};
export default MessageNotification;
