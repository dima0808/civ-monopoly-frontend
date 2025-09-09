import '../Chat.scss';

const Message = ({ message, isYourMessage, isFirst, isLast }) => {
  return (
    <div className={(isFirst ? 'first' : '') + (isLast ? ' appendix' : '')}>
      <div className={'message ' + (isYourMessage ? 'your' : 'not-your')}>
        <div className="message-content">{message}</div>
      </div>
    </div>
  );
};

export default Message;
