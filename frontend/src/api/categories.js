import api from './index';

// GET categories by user ID
export const fetchCategories = (userId) =>
  api.get(`/categories/user/${userId}`);

// GET category by ID
export const fetchCategoryById = (id) =>
  api.get(`/categories/${id}`);

// CREATE a new category
export const addCategory = (category) =>
  api.post('/categories', category);

// UPDATE an existing category
export const updateCategory = (id, category) =>
  api.put(`/categories/${id}`, category);

// DELETE a category
export const deleteCategory = (id) =>
  api.delete(`/categories/${id}`);