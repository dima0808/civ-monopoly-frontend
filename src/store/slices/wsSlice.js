import { createSlice } from '@reduxjs/toolkit';
import { Client } from '@stomp/stompjs';
import Cookies from 'js-cookie';
import { WS_BASE_URL } from '../../constants/api.js';

let stompClient = null;

const wsSlice = createSlice({
  name: 'ws',
  initialState: {
    connected: false,
  },
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
  },
});

export const { setConnected } = wsSlice.actions;

export const connectWebSocket = () => (dispatch) => {
  stompClient = new Client({
    brokerURL: WS_BASE_URL,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('[WS] WebSocket Connected');
      dispatch(setConnected(true));
    },
    onWebSocketClose: () => {
      console.log('[WS] WebSocket Closed');
      dispatch(setConnected(false));
    },
    onWebSocketError: (event) => {
      console.error('[WS] WebSocket Error', event);
      dispatch(setConnected(false));
    },
    onStompError: (frame) => {
      console.error('[WS] Stomp Error', frame.headers['message']);
      console.error('[WS] Full frame:', frame);
      dispatch(setConnected(false));
    },
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => async (dispatch) => {
  if (stompClient) {
    await stompClient.deactivate();
    dispatch(setConnected(false));
  }
};

export const getStompClient = () => stompClient;

export default wsSlice.reducer;
