import axios from '../config/axios.js';

const REQUEST_MAPPING = '/properties';

export const buyProperty = async (position) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/buy`, { position });
  return data;
};

export const payRent = async (position) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/pay-rent`, {
    position,
  });
  return data;
};
