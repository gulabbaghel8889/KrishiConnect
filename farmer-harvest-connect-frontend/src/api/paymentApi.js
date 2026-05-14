import api from './axios';

export const initiatePayment = async (amount) => {
  const response = await api.post('/payments/create-order', { amount });
  return response.data;
};