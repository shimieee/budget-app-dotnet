import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#e9e5d6] p-6 flex flex-col justify-between border-r border-[#d9cbb2]">
      <div>
        <h2 className="text-2xl font-bold text-[#425951] mb-8">BudgetWise</h2>
        <nav className="space-y-2">
          <Link to="/dashboard" className="flex items-center text-[#667538] hover:text-[#425951] font-medium transition duration-200 p-2 rounded-md hover:bg-[#d9cbb2]">
            <span className="mr-3 text-lg">📊</span> Dashboard
          </Link>
          <Link to="/transactions" className="flex items-center text-[#667538] hover:text-[#425951] font-medium transition duration-200 p-2 rounded-md hover:bg-[#d9cbb2]">
            <span className="mr-3 text-lg">💸</span> Transactions
          </Link>
          <Link to="/categories" className="flex items-center text-[#667538] hover:text-[#425951] font-medium transition duration-200 p-2 rounded-md hover:bg-[#d9cbb2]">
            <span className="mr-3 text-lg">🏷️</span> Categories
          </Link>
        </nav>
      </div>
      <div className="text-sm text-[#b88b5a]">
        <p>© 2023 BudgetWise</p>
      </div>
    </aside>
  );
};

export default Sidebar; 