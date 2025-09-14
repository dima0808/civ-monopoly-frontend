import axios from '../config/axios.js';

const REQUEST_MAPPING = '/rooms';

export const getAllRooms = async () => {
  const { data } = await axios.get(REQUEST_MAPPING);
  return data;
};

export const getRoomByReference = async (reference) => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/${reference}`);
  return data;
};

export const createRoom = async ({ name, memberLimit, password }) => {
  const { data } = await axios.post(REQUEST_MAPPING, {
    name,
    memberLimit,
    password,
  });
  return data;
};

export const joinRoom = async ({ reference, password }) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/join/${reference}`, {
    password,
  });
  return data;
};

export const kickMember = async (memberReference) => {
  const { data } = await axios.post(
    `${REQUEST_MAPPING}/kick/${memberReference}`,
  );
  return data;
};

export const leaveRoom = async () => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/leave`);
  return data;
};
