import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getGameConfiguration,
  getPropertiesConfiguration,
} from '../../http/requests/config.js';

export const getPropertiesConfig = createAsyncThunk(
  'config/getPropertiesConfig',
  getPropertiesConfiguration,
);

export const getGameConfig = createAsyncThunk(
  'config/getGameConfig',
  getGameConfiguration,
);

const configSlice = createSlice({
  name: 'config',
  initialState: {
    properties: null,
    game: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertiesConfig.fulfilled, (state, action) => {
        state.properties = action.payload.properties;
      })
      .addCase(getPropertiesConfig.rejected, (state) => {
        state.properties = null;
      })
      .addCase(getGameConfig.fulfilled, (state, action) => {
        state.game = action.payload;
      })
      .addCase(getGameConfig.rejected, (state) => {
        state.game = null;
      });
  },
});

export default configSlice.reducer;
