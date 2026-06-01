import axios from '../config/axios.js';

const REQUEST_MAPPING = '/events';

export const getMyEvents = async () => {
  const { data } = await axios.get(REQUEST_MAPPING);
  return data;
};

export const skipEvent = async (type) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/skip/${type}`);
  return data;
};
