import { createSlice } from '@reduxjs/toolkit';
import {
  NOTIFICATION_DISAPPEARING_DELAY,
  NOTIFICATION_DISPLAY_TIME,
} from '../../constants/notification.js';

const notificationSlice = createSlice({
  name: 'chat',
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    markNotificationDisappearing: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload,
      );
      if (notification) {
        notification.isDisappearing = true;
      }
    },
  },
});

export const pushNotification = (notification) => (dispatch) => {
  const id = Date.now();
  const isDisappearing = false;
  const payload = { ...notification, id, isDisappearing };

  dispatch(addNotification(payload));

  setTimeout(() => {
    dispatch(markNotificationDisappearing(id));
  }, NOTIFICATION_DISPLAY_TIME - NOTIFICATION_DISAPPEARING_DELAY);

  setTimeout(() => {
    dispatch(removeNotification(id));
  }, NOTIFICATION_DISPLAY_TIME);
};

export const { addNotification } = notificationSlice.actions;
export const { removeNotification } = notificationSlice.actions;
export const { clearNotifications } = notificationSlice.actions;
export const { markNotificationDisappearing } = notificationSlice.actions;
export default notificationSlice.reducer;
