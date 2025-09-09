import './NotificationList.scss';
import errorImg from '../../images/error-img.png';
const ErrorNotification = () => {
  return (
    <div className=" notification--error">
      <img src={errorImg} className="notification--error--img" alt="error" />
      <p className="notification--error--p">
        Your ass is too big and your cock is in my big..... fweffwfwe
      </p>
    </div>
  );
};
export default ErrorNotification;
