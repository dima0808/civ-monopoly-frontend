import axios from '../config/axios.js';
import Cookies from 'js-cookie';

export const getAllRooms = async () => {
  const { data } = await axios.get('/rooms');
  return data;
};

export const createRoom = async ({ name, memberLimit, password }) => {
  const { data } = await axios.post(
    '/rooms',
    { name, memberLimit, password },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return data;
};

export const joinRoom = async ({ reference, password }) => {
  const { data } = await axios.post(
    `/rooms/join/${reference}`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return data;
};

export const kickMember = async (memberReference) => {
  const { data } = await axios.post(
    `/rooms/kick/${memberReference}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return data;
};

export const leaveRoom = async () => {
  const { data } = await axios.post(
    '/rooms/leave',
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  );
  return data;
};
