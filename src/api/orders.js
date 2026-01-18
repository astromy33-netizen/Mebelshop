import axios from 'axios';

const BASE_URL = 'https://6969e5563a2b2151f8467c2f.mockapi.io/orders';

export const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const create = async (order) => {
  const response = await axios.post(BASE_URL, order);
  return response.data;
};

export const update = async (id, order) => {
  const response = await axios.put(`${BASE_URL}/${id}`, order);
  return response.data;
};

export const remove = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
