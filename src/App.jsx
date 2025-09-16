import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import RulesPage from './pages/RulesPage/RulesPage.jsx';
import SignInPage from './pages/authentication/SignInPage.jsx';
import SignUpPage from './pages/authentication/SignUpPage.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE, LANGUAGES } from './constants/lang.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getMe } from './store/slices/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  connectWebSocket,
  disconnectWebSocket,
  getStompClient,
} from './store/slices/wsSlice.js';
import PrivateChatDialog from './components/chat/private/PrivateChatDialog.jsx';
import NotificationList from './components/notification/NotificationList.jsx';
import Cookies from 'js-cookie';
import { pushNotification } from './store/slices/notificationSlice.js';
import {
  NOTIFICATION_MESSAGE,
  NOTIFICATION_OTHER,
} from './constants/notification.js';
import { findSecondUser } from './utils/chat.js';
import Game from './pages/Game/Game.jsx';
import Profile from './pages/Profile/Profile.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());

    dispatch(connectWebSocket());
    return () => {
      dispatch(disconnectWebSocket());
    };
  }, [dispatch]);

  return (
    <ChatAndNotificationLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/:lang" element={<LanguageValidator />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="rules" element={<RulesPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="game/:reference" element={<Game />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </ChatAndNotificationLayout>
  );
};

const ChatAndNotificationLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { openedChat } = useSelector((state) => state.chat);
  const wsConnected = useSelector((state) => state.ws.connected);
  const isChatOpen = useSelector((state) => state.chat.isOpen);

  const openedChatRef = useRef(openedChat);
  useEffect(() => {
    openedChatRef.current = openedChat;
  }, [openedChat]);

  const onNotificationMessageReceived = useCallback(
    (wsMessage) => {
      const { message, messagePayload, type } = JSON.parse(wsMessage.body);
      switch (type) {
        case 'PRIVATE_MESSAGE_SENT':
          if (
            findSecondUser(openedChatRef.current?.users, user?.username) ===
            message.sender
          ) {
            return;
          }
          dispatch(pushNotification({ type: NOTIFICATION_MESSAGE, message }));
          break;
        case 'USER_WAS_KICKED':
        case 'USER_BECAME_OWNER':
          dispatch(
            pushNotification({ type: NOTIFICATION_OTHER, messagePayload }),
          );
          break;
        default:
          break;
      }
    },
    [dispatch, user],
  );

  useEffect(() => {
    if (!user) return;
    const client = getStompClient();
    if (!client || !wsConnected) return;

    const subscription = client.subscribe(
      `/user/${user.username}/notifications`,
      onNotificationMessageReceived,
      {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [onNotificationMessageReceived, user, wsConnected]);

  return (
    <>
      {children}
      {isChatOpen && <PrivateChatDialog />}
      <NotificationList />
    </>
  );
};

const LanguageValidator = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const [isLegalLang, setIsLegalLang] = useState(true);
  const isInternalLangValid = LANGUAGES.includes(i18n.language);

  useEffect(() => {
    if (!isInternalLangValid) {
      setIsLegalLang(false);
      i18n.changeLanguage(DEFAULT_LANGUAGE).then(() => {
        setIsLegalLang(true);
      });
    }
  }, [i18n.language]);

  if (!isLegalLang) {
    return <div>Loading...</div>; // TODO: better loading component
  }

  if (!LANGUAGES.includes(segments[0])) {
    return (
      <Navigate
        to={`/${
          !isInternalLangValid ? DEFAULT_LANGUAGE : i18n.language
        }/${segments.join('/')}`}
        replace
      />
    );
  }

  if (i18n.language !== segments[0]) {
    return (
      <Navigate
        to={`/${
          !isInternalLangValid ? DEFAULT_LANGUAGE : i18n.language
        }/${segments.slice(1).join('/')}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default App;
