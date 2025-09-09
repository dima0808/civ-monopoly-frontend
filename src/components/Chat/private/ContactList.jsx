import Contact from './Contact.jsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getAllPrivateChats } from '../../../http/requests/chatPrivate.js';
import { PRIVATE_CHAT_CONTACTS_DEBOUNCE_DELAY } from '../../../constants/chat.js';
import { useSelector } from 'react-redux';
import { getStompClient } from '../../../store/slices/wsSlice.js';
import Cookies from 'js-cookie';
import { findSecondUser } from '../../../utils/chat.js';

const ContactList = ({ openedChat, setOpenedChat }) => {
  const { user } = useSelector((state) => state.auth);
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
        setOpenedChat(null);
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
  }, [search, setOpenedChat, user]);

  const onContactMessageReceived = useCallback(
    (wsMessage) => {
      const { chat, type } = JSON.parse(wsMessage.body);
      const su = findSecondUser(chat?.users, user?.username);
      switch (type) {
        case 'SEND':
          setChats((prevChats) => {
            let found = false;
            prevChats.map((c) => {
              if (c.reference === chat?.reference) {
                found = true;
                return chat;
              }
              return c;
            });

            if (
              !found &&
              su ===
                findSecondUser(openedChatRef.current?.users, user?.username)
            ) {
              setTimeout(() => setOpenedChat(chat), 0);
            }

            const filtered = prevChats.filter(
              (c) => findSecondUser(c?.users, user?.username) !== su,
            );
            return [chat, ...filtered];
          });
          break;
        case 'DELETE':
          // TODO: handle delete message if it would be implemented
          break;
      }
    },
    [setChats, setOpenedChat, user],
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
    return <div>Loading...</div>; // TODO: better loader
  };

  const displayNoContacts = () => {
    return <div>No contacts</div>; // TODO: better no contacts state
  };

  const displayError = () => {
    return <div>{error}</div>; // TODO: better error display
  };

  const displayContacts = () => {
    return chats.map((chat, index) => {
      const su = findSecondUser(chat?.users, user?.username);
      return (
        <Contact
          key={index}
          lastMessage={chat.messages.at(-1)?.message}
          secondUser={su}
          isSelected={findSecondUser(openedChat?.users, user?.username) === su}
          onClick={() => setOpenedChat(chat)}
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
          placeholder="Find User"
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
