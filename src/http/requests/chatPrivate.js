import axios from '../config/axios.js';

const REQUEST_MAPPING = '/chats/private';

export const getAllPrivateChats = async (username = null) => {
  const { data } = await axios.get(`${REQUEST_MAPPING}`, {
    params: { username },
  });
  return data;
};

export const createPrivateChat = async (receiverUsername, { message }) => {
  const { data } = await axios.post(
    `${REQUEST_MAPPING}`,
    { message },
    {
      params: { receiverUsername },
    },
  );
  return data;
};

export const getChatByReference = async (reference) => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/${reference}`);
  return data;
};

export const getChatByUsernames = async (username1, username2) => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/between`, {
    params: { username1, username2 },
  });
  return data;
};

export const sendMessage = async (reference, { message }) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/${reference}`, {
    message,
  });
  return data;
};
