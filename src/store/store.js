import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import wsReducer from './slices/wsSlice';
import chatSlice from './slices/chatSlice.js';
import notificationSlice from './slices/notificationSlice.js';
import configSlice from './slices/configSlice.js';
import gameSlice from './slices/gameSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatSlice,
    config: configSlice,
    game: gameSlice,
    notification: notificationSlice,
    ws: wsReducer,
  },
});
