import axios from 'axios';

const BASE_URL = 'https://6969e4093a2b2151f8467813.mockapi.io/favorites';

export const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const create = async (favorite) => {
  const response = await axios.post(BASE_URL, favorite);
  return response.data;
};

export const update = async (id, favorite) => {
  const response = await axios.put(`${BASE_URL}/${id}`, favorite);
  return response.data;
};

export const remove = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
