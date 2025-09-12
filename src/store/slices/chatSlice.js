import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isOpen: false,
    openedChat: null,
  },
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    turnOffChat: (state) => {
      state.isOpen = false;
      state.openedChat = null;
    },
    turnOnChat: (state) => {
      state.isOpen = true;
    },
    setOpenedChat: (state, action) => {
      state.openedChat = action.payload;
    },
  },
});

export const { toggleChat } = chatSlice.actions;
export const { turnOffChat } = chatSlice.actions;
export const { turnOnChat } = chatSlice.actions;
export const { setOpenedChat } = chatSlice.actions;
export default chatSlice.reducer;
