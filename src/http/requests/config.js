import axios from '../config/axios.js';

const REQUEST_MAPPING = '/configs';

export const getPropertiesConfiguration = async () => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/properties`);
  return data;
};

export const getGameConfiguration = async () => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/game`);
  return data;
};
