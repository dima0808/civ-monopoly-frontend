import './NotificationList.scss';
import otherImg from '../../images/other-img.png';

const OtherNotification = ({ information, isDisappearing }) => {
  return (
    <div
      className={`notification--error notification--other
    ${isDisappearing ? ' set__opacity' : ''}`}
    >
      <img src={otherImg} className="notification--error--img" alt="error" />
      <p className="notification--error--p">{information}</p>
    </div>
  );
};
export default OtherNotification;
