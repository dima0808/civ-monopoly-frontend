import './Chat.scss';

import civkaLogoImg from '../../../../images/civka-logo.png';
import { useEffect, useRef, useState } from 'react';
import {
  getChatByReference,
  sendMessage,
} from '../../../../http/requests/chatPublic.js';
import {
  clearInput,
  forceScrollToBottom,
  onEnterClick,
  scrollToBottom,
} from '../../../../utils/chat.js';
import { getStompClient } from '../../../../store/slices/wsSlice.js';
import { pushNotification } from '../../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../../constants/notification.js';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Message from './Message.jsx';
import { PUBLIC_CHAT_SYMBOL_LIMIT } from '../../../../constants/chat.js';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { reference } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { room } = useSelector((state) => state.room);
  const wsConnected = useSelector((state) => state.ws.connected);
  const messageInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);

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
    getChatByReference(reference)
      .then((data) => {
        setMessages(data.messages);
        setTimeout(() => {
          forceScrollToBottom(chatContainerRef.current);
        }, 100);
      })
      .catch((e) => setError(e.message));
  }, [reference]);

  useEffect(() => {
    const client = getStompClient();
    if (!client || !wsConnected) {
      return;
    }

    const subscription = client.subscribe(
      '/topic/chats/' + reference,
      onChatMessageReceived,
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [reference, wsConnected]);

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

    const messageToSend = messageInputRef.current.value;
    clearInput(messageInputRef);

    sendMessage(reference, {
      message: messageToSend,
    })
      .then()
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

  const displayError = () => {
    return (
      <div className="loading loading-home">
        <p className="loading--message">{error}</p>
      </div>
    );
  };

  const displayMessages = () => {
    return messages.map((msg) => (
      <Message
        key={msg.reference}
        sender={msg.sender}
        timeStamp={msg.timeStamp}
        color={room.members.find((m) => m.username === msg.sender)?.color}
      >
        {msg.message}
      </Message>
    ));
  };

  return (
    <div className="board__element board__element-center border">
      <img src={civkaLogoImg} alt="civka logo" className="logo-center" />
      <div className="chat-monopoly">
        <div ref={chatContainerRef} className="chat-zone-monopoly scroll">
          {messages == null && !error && displayLoading()}
          {error && displayError()}

          {messages && messages.length > 0 && displayMessages()}
        </div>

        <div className="monopoly-flex-between">
          <textarea
            ref={messageInputRef}
            onKeyDown={(e) => onEnterClick(e, onSendPublicMessage)}
            disabled={user == null}
            className="chat__typing-input monopoly-chat__typing-input scroll"
            maxLength={PUBLIC_CHAT_SYMBOL_LIMIT}
          ></textarea>
          <button
            onClick={onSendPublicMessage}
            disabled={user == null}
            className="chat__typing-btn monopoly-chat__typing-btn"
          >
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
