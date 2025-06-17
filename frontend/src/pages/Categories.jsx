import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState([
    { name: "Food", totalSpent: 105.70 },
    { name: "Transport", totalSpent: 45.00 },
    { name: "Rent", totalSpent: 1200.00 },
    { name: "Utilities", totalSpent: 80.00 },
    { name: "Entertainment", totalSpent: 175.00 },
    { name: "Shopping", totalSpent: 200.00 },
    { name: "Savings", totalSpent: 500.00 },
    { name: "Health", totalSpent: 60.00 },
  ]);

  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim() === "") return;

    const newCategory = { name: newCategoryName.trim(), totalSpent: 0 };
    setCategoriesData([...categoriesData, newCategory]);
    setNewCategoryName("");
  };

  return (
    <div className="flex min-h-screen bg-[#F4EBD0]">
      <Sidebar />

      <div className="flex-1 p-8 sm:p-12 lg:p-16 overflow-y-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#425951] mb-10 text-center">Your Categories</h1>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 mb-10 border border-[#d9cbb2]">
          <h2 className="text-2xl font-semibold text-[#425951] mb-4">Add New Category</h2>
          <form onSubmit={handleAddCategory} className="flex gap-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d3a8] bg-[#f9f5ed] text-[#425951]"
            />
            <button
              type="submit"
              className="bg-[#667538] text-white px-6 py-2 rounded-md hover:bg-[#425951] transition"
            >
              Add
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categoriesData.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow-sm p-6 border border-[#d9cbb2] flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold text-[#667538] mb-2">{category.name}</h2>
              <p className="text-3xl font-bold text-[#b88b5a]">${category.totalSpent.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories; 