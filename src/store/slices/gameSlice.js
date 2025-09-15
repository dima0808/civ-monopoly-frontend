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
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload;
    },
    updateMember: (state, action) => {
      const updatedMember = action.payload;
      state.room.members = state.room.members.map((m) =>
        m.username === updatedMember.username ? updatedMember : m,
      );
    },
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

export const { setRoom } = gameSlice.actions;
export const { updateMember } = gameSlice.actions;
export default gameSlice.reducer;
