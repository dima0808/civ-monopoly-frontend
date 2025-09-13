import axios from '../config/axios.js';

const REQUEST_MAPPING = '/config';

export const getPropertiesConfiguration = async () => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/properties`);
  return data;
};
