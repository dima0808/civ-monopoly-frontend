import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRoomByReference } from '../../http/requests/room.js';

export const getRoom = createAsyncThunk(
  'game/getRoom',
  async (reference, thunkAPI) => {
    try {
      return await getRoomByReference(reference);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    room: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoom.fulfilled, (state, action) => {
        state.room = action.payload;
      })
      .addCase(getRoom.rejected, (state) => {
        state.room = null;
      });
  },
});

export default gameSlice.reducer;
