import api from './axios';

export const addToCart = async (data) => {
  const response = await api.post('/cart/add', data);
  return response.data;
};