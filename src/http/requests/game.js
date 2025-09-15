import axios from '../config/axios.js';

const REQUEST_MAPPING = '/games';

export const getAllCivilizations = async () => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/civilizations`);
  return data;
};

export const getAllColors = async () => {
  const { data } = await axios.get(`${REQUEST_MAPPING}/colors`);
  return data;
};

export const changeCivilization = async (civ) => {
  const { data } = await axios.post(`members/change-civilization`, {
    civilization: civ.toUpperCase(),
  });
  return data;
};

export const changeColor = async (color) => {
  const { data } = await axios.post(`members/change-color`, {
    color: color.toUpperCase(),
  });
  return data;
};

export const startGame = async () => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/start`);
  return data;
};

export const rollDice = async () => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/roll-dice`);
  return data;
};

export const endTurn = async () => {
  const { data } = await axios.post(`${REQUEST_MAPPING}/end-turn`);
  return data;
};
