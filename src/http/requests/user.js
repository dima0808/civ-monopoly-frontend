import axios from '../config/axios.js';

const REQUEST_MAPPING = '/users';

export const getCurrent = async () => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/current`);
  return data;
};

export const getUserByUsername = async (username) => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/${username}`);
  return data;
};

export const changeAvatar = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await axios.put(`${REQUEST_MAPPING}/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
