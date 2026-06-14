import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    selectedTab: 'EVENTS',
    managementTab: 'EMPIRE',
    selectedProperty: null,
    armySpendingIndex: 1,
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setManagementTab: (state, action) => {
      state.managementTab = action.payload;
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    setArmySpendingIndex: (state, action) => {
      state.armySpendingIndex = action.payload;
    },
  },
});

export const {
  setSelectedTab,
  setManagementTab,
  setSelectedProperty,
  setArmySpendingIndex,
} = gameSlice.actions;
export default gameSlice.reducer;
