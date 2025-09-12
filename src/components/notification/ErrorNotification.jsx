import './NotificationList.scss';
import errorImg from '../../images/error-img.png';

const ErrorNotification = ({ error, isDisappearing }) => {
  return (
    <div
      className={`notification--error
    ${isDisappearing ? ' set__opacity' : ''}`}
    >
      <img src={errorImg} className="notification--error--img" alt="error" />
      <p className="notification--error--p">{error}</p>
    </div>
  );
};
export default ErrorNotification;
