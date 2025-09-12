import '../Chat.scss';
import { Link } from 'react-router-dom';

const Message = ({ sender, color, children }) => {
  return (
    <p className="chat__element">
      <Link
        to={`/profile/${sender}`}
        className={`chat__element chat__element-username chat-color-${color}`}
      >
        {sender}:
      </Link>
      {children}
    </p>
  );
};

export default Message;
