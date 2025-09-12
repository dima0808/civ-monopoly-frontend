import './NotificationList.scss';
import MessageNotification from './MessageNotification';
import ErrorNotification from './ErrorNotification';
import OtherNotification from './OtherNotification';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import {
  NOTIFICATION_ERROR,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_OTHER,
} from '../../constants/notification.js';

const NotificationList = () => {
  const { notifications } = useSelector((state) => state.notification);

  const displayNotifications = () => {
    return notifications
      .slice()
      .reverse()
      .map((notification, index) => {
        switch (notification.type) {
          case NOTIFICATION_MESSAGE:
            return (
              <MessageNotification
                key={index}
                message={notification.message}
                isDisappearing={notification.isDisappearing}
              />
            );
          case NOTIFICATION_ERROR:
            return (
              <ErrorNotification
                key={index}
                error={notification.error}
                isDisappearing={notification.isDisappearing}
              />
            );
          case NOTIFICATION_OTHER:
            return (
              <OtherNotification
                key={index}
                information={notification.messagePayload.message}
                isDisappearing={notification.isDisappearing}
              />
            );
        }
      });
  };

  return createPortal(
    <div className="notification">
      <div className="notification--list">{displayNotifications()}</div>
    </div>,
    document.getElementById('modal'),
  );
};
export default NotificationList;
