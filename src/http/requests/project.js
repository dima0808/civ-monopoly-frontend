import axios from '../config/axios.js';

const REQUEST_MAPPING = '/projects';

export const chooseProject = async (projectType) => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/choose`, {
    projectType,
  });
  return data;
};

export const doScienceProject = async () => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/science`);
  return data;
};

export const doConcert = async () => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/concert`);
  return data;
};

export const getMyAdditionalEffects = async () => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/effects`);
  return data;
};
