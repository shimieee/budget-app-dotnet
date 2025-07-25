import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "../api/categories";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategoryName.trim() === "" || newCategoryBudget.trim() === "") return;
    setError("");
    try {
      const newCategory = {
        name: newCategoryName,
        budgetAmount: parseFloat(newCategoryBudget), // Backend property
      };
      const created = await createCategory(newCategory);
      setCategories([...categories, created]);
      setNewCategoryName("");
      setNewCategoryBudget("");
    } catch (error) {
      setError("Failed to add category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      setError("Failed to delete category");
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-[#F4EBD0]">
        <Sidebar />
        <main className="flex-1 p-8 sm:p-10 lg:p-12 overflow-y-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#425951] mb-8">Categories</h1>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-[#d9cbb2]">
            <h2 className="text-2xl font-semibold text-[#425951] mb-4">Add New Category</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-[#667538] mb-1">Category Name</label>
                <input
                  type="text"
                  id="categoryName"
                  className="w-full px-3 py-2 rounded-md bg-[#f9f5ed] border border-[#d9cbb2] text-[#425951] placeholder-[#b7d3a8] focus:outline-none focus:border-[#b88b5a] focus:ring-1 focus:ring-[#b88b5a]"
                  placeholder="e.g., Groceries"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="categoryBudget" className="block text-sm font-medium text-[#667538] mb-1">Budget Amount</label>
                <input
                  type="number"
                  id="categoryBudget"
                  className="w-full px-3 py-2 rounded-md bg-[#f9f5ed] border border-[#d9cbb2] text-[#425951] placeholder-[#b7d3a8] focus:outline-none focus:border-[#b88b5a] focus:ring-1 focus:ring-[#b88b5a]"
                  placeholder="e.g., 500"
                  value={newCategoryBudget}
                  onChange={(e) => setNewCategoryBudget(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto py-2 px-4 bg-[#667538] text-white font-semibold rounded-md hover:bg-[#425951] focus:outline-none focus:ring-2 focus:ring-[#b7d3a8] focus:ring-offset-2 focus:ring-offset-white transition-colors"
              >
                Add Category
              </button>
            </form>
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-[#d9cbb2]">
            <h2 className="text-2xl font-semibold text-[#425951] mb-4">Your Categories</h2>
            {loading ? (
              <p className="text-[#667538]">Loading...</p>
            ) : categories.length === 0 ? (
              <p className="text-[#667538]">No categories added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#d9cbb2]">
                  <thead className="bg-[#f9f5ed]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Category Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Budget</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Spent</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Remaining</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#f9f5ed]">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-[#fcfaf7] transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#425951]">{category.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#667538]">${category.budgetAmount?.toFixed(2) ?? "0.00"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b88b5a]">${category.spent?.toFixed(2) ?? "0.00"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={`${(category.budgetAmount - (category.spent ?? 0)) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ${(category.budgetAmount - (category.spent ?? 0))?.toFixed(2) ?? "0.00"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Categories;