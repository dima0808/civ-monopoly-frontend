import Contact from './Contact.jsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAllPrivateChats } from '../../../http/requests/chatPrivate.js';
import { PRIVATE_CHAT_CONTACTS_DEBOUNCE_DELAY } from '../../../constants/chat.js';
import { useDispatch, useSelector } from 'react-redux';
import { getStompClient } from '../../../store/slices/wsSlice.js';
import Cookies from 'js-cookie';
import { findSecondUser } from '../../../utils/chat.js';
import { setOpenedChat } from '../../../store/slices/chatSlice.js';
import { useTranslation } from 'react-i18next';

const ContactList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { openedChat } = useSelector((state) => state.chat);
  const wsConnected = useSelector((state) => state.ws.connected);

  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const openedChatRef = useRef(openedChat);
  useEffect(() => {
    openedChatRef.current = openedChat;
  }, [openedChat]);

  useEffect(() => {
    setChats(null);

    const delayDebounce = setTimeout(() => {
      if (!user) {
        dispatch(setOpenedChat(null));
        setError('User not logged in');
      }
      getAllPrivateChats(search || null)
        .then((data) => {
          setChats(data.chats);
          setError(null);
        })
        .catch((e) => setError(e.message));
    }, PRIVATE_CHAT_CONTACTS_DEBOUNCE_DELAY);

    return () => clearTimeout(delayDebounce);
  }, [dispatch, search, user]);

  const onContactMessageReceived = useCallback(
    (wsMessage) => {
      const { chat, type } = JSON.parse(wsMessage.body);
      const su = findSecondUser(chat?.users, user?.username);
      switch (type) {
        case 'SEND':
          setChats((prevChats) => {
            let found = false;
            if (prevChats == null) {
              prevChats = [];
            }
            prevChats.map((c) => {
              if (c.reference === chat?.reference) {
                found = true;
                return chat;
              }
              return c;
            });

            if (
              !found &&
              su.username ===
                findSecondUser(openedChatRef.current?.users, user?.username)
                  .username
            ) {
              setTimeout(() => dispatch(setOpenedChat(chat)), 0);
            }

            const filtered = prevChats.filter(
              (c) =>
                findSecondUser(c?.users, user?.username).username !==
                su.username,
            );
            return [chat, ...filtered];
          });
          break;
        case 'DELETE':
          // TODO: handle delete message if it would be implemented
          break;
      }
    },
    [dispatch, setChats, user],
  );

  useEffect(() => {
    if (!user) return;
    const client = getStompClient();
    if (!client || !wsConnected) return;

    const subscription = client.subscribe(
      `/user/${user.username}/chats/contacts`,
      onContactMessageReceived,
      {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [onContactMessageReceived, user, wsConnected]);

  const displayLoading = () => {
    return (
      <div className="loading loading--list">
        <p className="loading--message"> {t('chat.loading')}</p>
      </div>
    );
  };

  const displayNoContacts = () => {
    return (
      <div className="loading loading--list">
        <p className="loading--message"> {t('chat.noContacts')}</p>
      </div>
    ); // TODO: better no contacts state
  };

  const displayError = () => {
    return (
      <div className="loading loading--list">
        <p className="loading--message"> {error}</p>
      </div>
    );
  };

  const displayContacts = () => {
    return chats.map((chat, index) => {
      const su = findSecondUser(chat?.users, user?.username);
      return (
        <Contact
          key={index}
          lastMessage={chat.messages.at(-1)?.message}
          secondUser={su}
          isSelected={
            findSecondUser(openedChat?.users, user?.username)?.username ===
            su?.username
          }
          onClick={() => dispatch(setOpenedChat(chat))}
        />
      );
    });
  };

  return (
    <div className="user-contacts">
      <div className="search-user-contacts-div">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={!user}
          type="text"
          className="search-user-contacts search-user-contacts-input"
          placeholder={t('chat.findUser')}
        ></input>
      </div>
      <div className="your-contacts scrollable-div">
        {chats == null && !error && displayLoading()}
        {chats && chats.length === 0 && displayNoContacts()}
        {error && displayError()}

        {chats && chats.length > 0 && displayContacts()}
      </div>
    </div>
  );
};

export default ContactList;
