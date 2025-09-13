import '../Chat.scss';
import { useTranslation } from 'react-i18next';
import Message from './Message.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getChatByReference,
  sendMessage,
} from '../../../http/requests/chatPublic.js';
import {
  AVAILABLE_COLORS,
  PUBLIC_CHAT_REFERENCE,
  PUBLIC_CHAT_SYMBOL_LIMIT,
} from '../../../constants/chat.js';
import { getStompClient } from '../../../store/slices/wsSlice.js';
import {
  clearInput,
  forceScrollToBottom,
  handleInputChange,
  onEnterClick,
  scrollToBottom,
} from '../../../utils/chat.js';
import { pushNotification } from '../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../constants/notification.js';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const wsConnected = useSelector((state) => state.ws.connected);
  const messageInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);

  const userColors = {};
  let assignedCount = 0;

  const onChatMessageReceived = (wsMessage) => {
    const { message, type } = JSON.parse(wsMessage.body);
    switch (type) {
      case 'SEND':
        setMessages((prevMessages) => [...prevMessages, message]);
        break;
      case 'DELETE':
        setMessages((prevMessages) =>
          prevMessages.filter((m) => m.reference !== message.reference),
        );
        break;
    }
  };

  useEffect(() => {
    getChatByReference(PUBLIC_CHAT_REFERENCE)
      .then((data) => {
        setMessages(data.messages);
        setTimeout(() => {
          forceScrollToBottom(chatContainerRef.current);
        }, 100);
      })
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    const client = getStompClient();
    if (!client || !wsConnected) {
      return;
    }

    const subscription = client.subscribe(
      '/topic/chats/' + PUBLIC_CHAT_REFERENCE,
      onChatMessageReceived,
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [wsConnected]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) {
      return;
    }

    scrollToBottom(container, messages, user);
  }, [messages, user]);

  const onSendPublicMessage = () => {
    if (messageInputRef?.current?.value.trim() === '') {
      return;
    }
    sendMessage(PUBLIC_CHAT_REFERENCE, {
      message: messageInputRef.current.value,
    })
      .then(() => clearInput(messageInputRef))
      .catch((e) => {
        dispatch(
          pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
        );
      });
    messageInputRef.current.focus();
  };

  const displayLoading = () => {
    return (
      <div className="loading loading-home">
        <p className="loading--message">{t('chat.loading')}</p>
      </div>
    );
  };

  const displayNoMessages = () => {
    return (
      <div className="loading loading-home">
        <p className="loading--message">{t('chat.noMessages')}</p>
      </div>
    );
  };

  const displayError = () => {
    return (
      <div className="loading loading-home">
        <p className="loading--message">{error}</p>
      </div>
    );
  };

  const getUserColor = (sender) => {
    if (!userColors[sender]) {
      userColors[sender] =
        AVAILABLE_COLORS[assignedCount % AVAILABLE_COLORS.length];
      assignedCount++;
    }
    return userColors[sender];
  };

  const displayMessages = () => {
    return messages.map((msg) => (
      <Message
        key={msg.reference}
        sender={msg.sender}
        color={getUserColor(msg.sender)}
      >
        {msg.message}
      </Message>
    ));
  };

  return (
    <section className="chat">
      <div className="chat__title title-box">{t('chat.public')}</div>

      <div ref={chatContainerRef} className="chat__text scroll" id="chat">
        {messages == null && !error && displayLoading()}
        {messages && messages.length === 0 && displayNoMessages()}
        {error && displayError()}

        {messages && messages.length > 0 && displayMessages()}
      </div>

      <div className="chat__typing">
        <textarea
          ref={messageInputRef}
          onChange={(e) => handleInputChange(e, PUBLIC_CHAT_REFERENCE)}
          onKeyDown={(e) => onEnterClick(e, onSendPublicMessage)}
          disabled={user == null}
          className="chat__typing-input scroll"
          maxLength={PUBLIC_CHAT_SYMBOL_LIMIT}
        ></textarea>
        <button
          onClick={onSendPublicMessage}
          disabled={user == null}
          className="chat__typing-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="chat__typing-btn-svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Chat;
