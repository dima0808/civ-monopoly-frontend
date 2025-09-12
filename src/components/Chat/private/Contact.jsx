import '../Chat.scss';
import avatarImg from '../../../images/avatar.png';
const Contact = ({ lastMessage, secondUser, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`your-contact${isSelected ? ' your-contact-active' : ''}`}
    >
      <img src={avatarImg} className="your-contact--img" alt="avatar" />
      <div className="your-contact--div">
        <h2 className="your-contact--nickname">{secondUser}</h2>
        <p className="your-contact--p">{lastMessage}</p>
      </div>
    </div>
  );
};

export default Contact;
