import axios from 'axios';

const BASE_URL = 'https://6969e5563a2b2151f8467c2f.mockapi.io/bookings';

export const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const create = async (booking) => {
  const response = await axios.post(BASE_URL, booking);
  return response.data;
};

export const update = async (id, booking) => {
  const response = await axios.put(`${BASE_URL}/${id}`, booking);
  return response.data;
};

export const remove = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
