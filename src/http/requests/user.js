import axios from '../config/axios.js';

const REQUEST_MAPPING = '/users';

export const getCurrent = async () => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/current`);
  return data;
};
