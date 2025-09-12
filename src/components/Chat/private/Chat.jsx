import '../Chat.scss';
import Message from './Message.jsx';
import { useEffect, useRef, useState } from 'react';
import {
  createPrivateChat,
  getChat,
  sendMessage,
} from '../../../http/requests/chatPrivate.js';
import { PRIVATE_CHAT_SYMBOL_LIMIT } from '../../../constants/chat.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearInput,
  findSecondUser,
  forceScrollToBottom,
  handleInputChange,
  onEnterClick,
  scrollToBottom,
} from '../../../utils/chat.js';
import { getStompClient } from '../../../store/slices/wsSlice.js';
import Cookies from 'js-cookie';
import { turnOffChat } from '../../../store/slices/chatSlice.js';
import { pushNotification } from '../../../store/slices/notificationSlice.js';
import { NOTIFICATION_ERROR } from '../../../constants/notification.js';

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const openedContact = useSelector((state) => state.chat.openedChat);
  const wsConnected = useSelector((state) => state.ws.connected);

  const [chat, setChat] = useState(null);
  const [error, setError] = useState(null);
  const messageInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const secondUser = findSecondUser(chat?.users, user?.username);

  const onPrivateMessageReceived = (wsMessage) => {
    const { message, type } = JSON.parse(wsMessage.body);
    switch (type) {
      case 'SEND':
        setChat((prevChat) => {
          if (!prevChat) return prevChat;
          return {
            ...prevChat,
            messages: [...prevChat.messages, message],
          };
        });
        break;
      case 'DELETE':
        // TODO: handle delete message if it would be implemented
        break;
    }
  };

  useEffect(() => {
    if (openedContact == null) {
      return;
    }

    messageInputRef.current.focus();

    if (openedContact.reference) {
      getChat(openedContact.reference)
        .then((data) => {
          setChat(data);
          setTimeout(() => {
            forceScrollToBottom(chatContainerRef.current);
          }, 100);
        })
        .catch((e) => setError(e.message));
    } else if (openedContact.users) {
      setChat(openedContact);
    }
  }, [openedContact]);

  useEffect(() => {
    if (!openedContact?.reference) return;
    const client = getStompClient();
    if (!client || !wsConnected) return;

    const subscription = client.subscribe(
      `/topic/chats/${openedContact.reference}`,
      onPrivateMessageReceived,
      {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [openedContact, wsConnected]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container || !chat) {
      return;
    }

    scrollToBottom(container, chat.messages, user);
  }, [chat, user]);

  const onSendPrivateMessage = () => {
    if (chat.reference) {
      if (messageInputRef?.current?.value.trim() === '') {
        return;
      }
      sendMessage(chat.reference, {
        message: messageInputRef.current.value,
      })
        .then(() => clearInput(messageInputRef))
        .catch((e) => {
          dispatch(
            pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
          );
        });
      messageInputRef.current.focus();
    } else if (chat.users) {
      createPrivateChat(secondUser, {
        message: messageInputRef.current.value,
      })
        .then(() => clearInput(messageInputRef))
        .catch((e) => {
          dispatch(
            pushNotification({ type: NOTIFICATION_ERROR, error: e.message }),
          );
        });
    }
  };

  const displayLoading = () => {
    return (
      <div className="loading">
        <p className="loading--message"> Loading...</p>
      </div>
    ); // TODO: better loader
  };

  const displayNoMessages = () => {
    return (
      <div className="loading">
        <p className="loading--message"> No messages</p>
      </div>
    ); // TODO: better no messages state
  };

  const displayError = () => {
    return (
      <div className="loading">
        <p className="loading--message"> {error}</p>
      </div>
    ); // TODO: better error display
  };

  const displayMessages = () => {
    return chat.messages.map((msg, index) => {
      const prevMsg = index > 0 ? chat.messages[index - 1] : null;
      const nextMsg =
        index < chat.messages.length - 1 ? chat.messages[index + 1] : null;
      return (
        <Message
          key={msg.reference}
          message={msg.message}
          isYourMessage={msg.sender === user.username}
          isFirst={!prevMsg || prevMsg.sender !== msg.sender}
          isLast={!nextMsg || nextMsg.sender !== msg.sender}
        />
      );
    });
  };

  return (
    <div className="chosen-user">
      <div className="user-and-close">
        {openedContact ? (
          <Link to={`/profile/${secondUser}`} className="user-and-close-a">
            {secondUser}
          </Link>
        ) : (
          <p className="user-and-close-a"></p>
        )}
        <button
          onClick={() => dispatch(turnOffChat())}
          className="dialog-close"
        >
          {' '}
          {/* TODO: close */}{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="kick-svg2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="chat--padding--bottom">
        <div ref={chatContainerRef} className="chat-zone scroll">
          {openedContact && (
            <>
              {chat == null && !error && displayLoading()}
              {chat &&
                user &&
                chat.messages.length === 0 &&
                displayNoMessages()}
              {error && displayError()}

              {chat && user && chat.messages.length > 0 && displayMessages()}
            </>
          )}
        </div>
      </div>

      <div className="chat__typing chat__typing-dialog">
        <textarea
          ref={messageInputRef}
          onChange={(e) => handleInputChange(e, PRIVATE_CHAT_SYMBOL_LIMIT)}
          onKeyDown={(e) => onEnterClick(e, onSendPrivateMessage)}
          disabled={!openedContact}
          className="chat__typing-input chat__typing-input-dialog scroll"
          maxLength={PRIVATE_CHAT_SYMBOL_LIMIT}
        ></textarea>
        <button
          onClick={onSendPrivateMessage}
          disabled={!openedContact}
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
    </div>
  );
};

export default Chat;
