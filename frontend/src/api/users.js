import axios from './index';

export const fetchCurrentUser = async () => {
  const response = await axios.get('/user/me');
  return response.data;
};

export const updateCurrentUser = async (userData) => {
  const response = await axios.put('/user/me', userData);
  return response.data;
};