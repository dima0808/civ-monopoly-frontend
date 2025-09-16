import '../Chat.scss';

import { HTTP_BASE_URL } from '../../../constants/api.js';
const Contact = ({ lastMessage, secondUser, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`your-contact${isSelected ? ' your-contact-active' : ''}`}
    >
      <img
        src={`${HTTP_BASE_URL}${secondUser.avatarUrl}`}
        className="your-contact--img"
        alt="avatar"
      />
      <div className="your-contact--div">
        <h2 className="your-contact--nickname">{secondUser.username}</h2>
        <p className="your-contact--p">{lastMessage}</p>
      </div>
    </div>
  );
};

export default Contact;
