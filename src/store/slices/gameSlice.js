import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    selectedTab: 'EVENTS',
    armySpendingIndex: 1,
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setArmySpendingIndex: (state, action) => {
      state.armySpendingIndex = action.payload;
    },
  },
});

export const { setSelectedTab, setArmySpendingIndex } = gameSlice.actions;
export default gameSlice.reducer;
