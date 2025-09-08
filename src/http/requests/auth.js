import axios from '../config/axios.js';
import Cookies from 'js-cookie';

export const registerUser = async ({ username, password }) => {
  const { data } = await axios.post('/auth/register', {
    username,
    password,
  });
  Cookies.set('token', data.token);
  return data;
};

export const loginUser = async ({ username, password }) => {
  const { data } = await axios.post('/auth/login', {
    username,
    password,
  });
  Cookies.set('token', data.token);
  return data;
};

export const getCurrent = async () => {
  const { data } = await axios.get(`auth/current`);
  return data;
};
