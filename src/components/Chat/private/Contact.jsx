import '../Chat.scss';

const Contact = ({ lastMessage, secondUser, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`your-contact${isSelected ? ' your-contact-active' : ''}`}
    >
      <h2 className="your-contact-nickname">{secondUser}</h2>
      <p className="your-contact-p">{lastMessage}</p>
    </div>
  );
};

export default Contact;
