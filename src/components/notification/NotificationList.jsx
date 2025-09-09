import './NotificationList.scss';
import MessageNotification from './MessageNotification';
import ErrorNotification from './ErrorNotification';
import OtherNotification from './OtherNotification';
import { createPortal } from 'react-dom';

const NotificationList = () => {
  return createPortal(
    <div className="notification">
      <div className="notification--list">
        <MessageNotification />
        <ErrorNotification />
        <OtherNotification />
      </div>
    </div>,
    document.getElementById('modal'),
  );
};
export default NotificationList;
