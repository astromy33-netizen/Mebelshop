import axios from 'axios';

const BASE_URL = 'https://6968854769178471522ab887.mockapi.io/users';

export const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const create = async (user) => {
  const response = await axios.post(BASE_URL, user);
  return response.data;
};

export const update = async (id, user) => {
  const response = await axios.put(`${BASE_URL}/${id}`, user);
  return response.data;
};

export const remove = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
