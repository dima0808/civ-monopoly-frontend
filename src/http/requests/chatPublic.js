import axios from '../config/axios.js';

const REQUEST_MAPPING = '/chats/public';

export const getChat = async (reference) => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/${reference}`);
  return data;
};

export const sendMessage = async (reference, { message }) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/${reference}`, {
    message,
  });
  return data;
};

export const deleteMessage = async (chatReference, messageReference) => {
  await axios.delete(`${REQUEST_MAPPING}/${chatReference}/${messageReference}`);
};

export const muteUser = async (username) => {
  await axios.put(`${REQUEST_MAPPING}/mute/${username}`);
};

export const unmuteUser = async (username) => {
  await axios.put(`${REQUEST_MAPPING}/unmute/${username}`);
};
