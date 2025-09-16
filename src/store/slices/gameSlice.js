import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    selectedTab: 'EVENTS',
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = gameSlice.actions;
export default gameSlice.reducer;
