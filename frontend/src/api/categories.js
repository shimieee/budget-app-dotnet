import axios from './index';

// Get all categories for the logged-in user
export const fetchCategories = async () => {
  const response = await axios.get("/category");
  return response.data;
};

// Add a new category
export const createCategory = async (category) => {
  const response = await axios.post("/category", category);
  return response.data;
};

// Update a category by ID
export const updateCategory = async (id, category) => {
  const response = await axios.put(`/category/${id}`, category);
  return response.data;
};

// Delete a category by ID
export const deleteCategory = async (id) => {
  const response = await axios.delete(`/category/${id}`);
  return response.data;
};