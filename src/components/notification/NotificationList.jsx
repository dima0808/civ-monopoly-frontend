import './NotificationList.scss';
import MessageNotification from './MessageNotification';
import ErrorNotification from './ErrorNotification';
import OtherNotification from './OtherNotification';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  NOTIFICATION_ERROR,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_OTHER,
} from '../../constants/notification.js';
import { clearNotifications } from '../../store/slices/notificationSlice.js';

const NotificationList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
      <div className="notification--list">
        {notifications.length > 0 && (
          <button
            onClick={() => dispatch(clearNotifications())}
            className="notification--btn"
          >
            {t('notification.clearAll')}
          </button>
        )}
        {displayNotifications()}
      </div>
    </div>,
    document.getElementById('modal'),
  );
};
export default NotificationList;
