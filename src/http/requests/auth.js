import axios from '../config/axios.js';
import Cookies from 'js-cookie';

const REQUEST_MAPPING = '/auth';

export const registerUser = async ({ username, password }) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/register`, {
    username,
    password,
  });
  Cookies.set('token', data.token);
  return data;
};

export const loginUser = async ({ username, password }) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/login`, {
    username,
    password,
  });
  Cookies.set('token', data.token);
  return data;
};

export const getCurrent = async () => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/current`);
  return data;
};
