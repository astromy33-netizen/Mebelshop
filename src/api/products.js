import axios from 'axios';

const BASE_URL = 'https://6968854769178471522ab887.mockapi.io/productss';

export const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const create = async (product) => {
  const response = await axios.post(BASE_URL, product);
  return response.data;
};

export const update = async (id, product) => {
  const response = await axios.put(`${BASE_URL}/${id}`, product);
  return response.data;
};

export const remove = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
