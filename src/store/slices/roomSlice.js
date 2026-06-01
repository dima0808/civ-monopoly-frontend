import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRoomByReference } from '../../http/requests/room.js';

export const getRoom = createAsyncThunk(
  'room/getRoom',
  async (reference, thunkAPI) => {
    try {
      return await getRoomByReference(reference);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const roomSlice = createSlice({
  name: 'room',
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
    updateMembers: (state, action) => {
      const updatedMembers = action.payload;
      state.room.members = state.room.members.map((m) => {
        const updated = updatedMembers.find((u) => u.username === m.username);
        return updated || m;
      });
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

export const { setRoom, updateMember, updateMembers } = roomSlice.actions;
export default roomSlice.reducer;
