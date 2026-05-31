import axios from '../config/axios.js';

const REQUEST_MAPPING = '/events';

export const skipEvent = async (type) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/skip/${type}`);
  return data;
};
