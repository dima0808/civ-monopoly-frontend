import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { getCurrent } from '../../http/requests/user.js';

export const getMe = createAsyncThunk('auth/getMe', getCurrent);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    logout: (state) => {
      Cookies.remove('token');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state) => {
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
