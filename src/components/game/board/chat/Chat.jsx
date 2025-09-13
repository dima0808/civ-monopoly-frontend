import './Chat.scss';

import civkaLogoImg from '../../../../images/civka-logo.png';

const Chat = () => {
  return (
    <div className="board__element board__element-center border">
      <img src={civkaLogoImg} alt="civka logo" className="logo-center" />
      <div className="chat-monopoly">
        <div className="chat-zone-monopoly scroll">
          {/* Messages will be displayed here */}
        </div>
        <div className="monopoly-flex-between">
          <textarea
            className="chat__typing-input monopoly-chat__typing-input scroll"
            maxLength={250}
          ></textarea>
          <button className="chat__typing-btn monopoly-chat__typing-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="chat__typing-btn-svg board-chat__typing-btn-svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
