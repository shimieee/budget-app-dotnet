import axios from './index';
//This file contains API calls for managing users
// Fetch current user
export const fetchCurrentUser = async () => {
  const response = await axios.get('/user/me');
  return response.data;
};
// update current user profile
export const updateCurrentUser = async (userData) => {
  const response = await axios.put('/user/me', userData);
  return response.data;
};