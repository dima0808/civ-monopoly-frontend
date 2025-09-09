import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    turnOffChat: (state) => {
      state.isOpen = false;
    },
    turnOnChat: (state) => {
      state.isOpen = true;
    },
  },
});

export const { toggleChat } = chatSlice.actions;
export const { turnOffChat } = chatSlice.actions;
export const { turnOnChat } = chatSlice.actions;
export default chatSlice.reducer;
