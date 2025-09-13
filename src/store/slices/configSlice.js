import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPropertiesConfiguration } from '../../http/requests/config.js';

export const getPropertiesConfig = createAsyncThunk(
  'config/getPropertiesConfig',
  getPropertiesConfiguration,
);

const configSlice = createSlice({
  name: 'config',
  initialState: {
    properties: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertiesConfig.fulfilled, (state, action) => {
        state.properties = action.payload.properties;
      })
      .addCase(getPropertiesConfig.rejected, (state) => {
        state.properties = null;
      });
  },
});

export default configSlice.reducer;
