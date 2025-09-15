import './Chat.scss';

import { Link } from 'react-router-dom';

const Message = ({ sender, color, timeStamp, children }) => {
  const formattedDate = new Date(timeStamp).toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="chat-zone-monopoly-div">
      <div className="chat-zone-monopoly-message">
        <Link
          to={`/profile/${sender}`}
          className={`nickname-span chat-color-${color?.toLowerCase()}`}
        >
          {sender}:
        </Link>
        {children}
      </div>
      <p className="chat-zone-monopoly-time">{formattedDate}</p>
    </div>
  );
};

export default Message;
