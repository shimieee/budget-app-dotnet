import api from './index';

// GET a user by ID
export const fetchUser = (id) =>
  api.get(`/users/${id}`);

// GET all users (optional)
export const fetchAllUsers = () =>
  api.get('/users');

// CREATE a user (optional)
export const addUser = (user) =>
  api.post('/users', user);

// UPDATE user (optional)
export const updateUser = (id, user) =>
  api.put(`/users/${id}`, user);

// DELETE user (optional)
export const deleteUser = (id) =>
  api.delete(`/users/${id}`);