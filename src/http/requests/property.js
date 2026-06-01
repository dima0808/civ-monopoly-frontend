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

export const getPropertiesByRoom = async (roomReference) => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/room/${roomReference}`);
  return data;
};

export const upgradeProperty = async (position, upgradeType) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/upgrade`, {
    position,
    upgradeType,
  });
  return data;
};

export const mortgageProperty = async (position) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/mortgage`, {
    position,
  });
  return data;
};

export const demoteProperty = async (position) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/demote`, { position });
  return data;
};

export const buybackProperty = async (position) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/buyback`, {
    position,
  });
  return data;
};
