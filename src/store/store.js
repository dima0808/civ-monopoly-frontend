import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import wsReducer from './slices/wsSlice';
import chatSlice from './slices/chatSlice.js';
import notificationSlice from './slices/notificationSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatSlice,
    notification: notificationSlice,
    ws: wsReducer,
  },
});
