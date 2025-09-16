import { CHAT_SCROLL_DETECTION_THRESHOLD } from '../constants/chat.js';

export const clearInput = (messageInputRef) => {
  if (messageInputRef.current) {
    messageInputRef.current.value = '';
  }
};

export const onEnterClick = (event, action) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    action();
  }
};

export const findSecondUser = (users, currentUsername) => {
  return users?.find((u) => u.username !== currentUsername);
};

export const scrollToBottom = (container, messages, user) => {
  const isAtBottom =
    Math.abs(
      container.scrollTop + container.clientHeight - container.scrollHeight,
    ) < CHAT_SCROLL_DETECTION_THRESHOLD;
  const isUserSender = messages?.at(-1)?.sender === user?.username;
  if (isAtBottom || isUserSender) {
    container.scrollTop = container.scrollHeight;
  }
};

export const forceScrollToBottom = (container) => {
  container.scrollTop = container.scrollHeight;
};
