import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Import the new Sidebar component

const Dashboard = () => {
  const categories = [
    { name: "Food", transactions: [{ id: 1, description: "Groceries", amount: 75.20 }, { id: 2, description: "Restaurant", amount: 30.50 }] },
    { name: "Transport", transactions: [{ id: 3, description: "Gas", amount: 40.00 }, { id: 4, description: "Bus Fare", amount: 5.00 }] },
    { name: "Rent", transactions: [{ id: 5, description: "Monthly Rent", amount: 1200.00 }] },
    { name: "Utilities", transactions: [{ id: 6, description: "Electricity Bill", amount: 80.00 }] },
    { name: "Entertainment", transactions: [{ id: 7, description: "Concert Tickets", amount: 150.00 }, { id: 8, description: "Movie Night", amount: 25.00 }] },
    { name: "Shopping", transactions: [{ id: 9, description: "New Clothes", amount: 200.00 }] },
  ];

  // Dummy data for summary and recent transactions
  const totalBalance = categories.reduce((acc, cat) => acc + cat.transactions.reduce((tAcc, t) => tAcc + t.amount, 0), 0);
  const totalIncome = 2500.00; // Placeholder
  const totalExpenses = totalBalance; // For simplicity, assume all transactions are expenses

  const recentTransactions = [
    { id: 101, date: "2023-10-26", description: "Coffee Shop", category: "Food", amount: 5.50 },
    { id: 102, date: "2023-10-25", description: "Monthly Salary", category: "Income", amount: 2500.00 },
    { id: 103, date: "2023-10-24", description: "Supermarket", category: "Food", amount: 90.15 },
    { id: 104, date: "2023-10-23", description: "Electricity Bill", category: "Utilities", amount: 80.00 },
    { id: 105, date: "2023-10-22", description: "Train Ticket", category: "Transport", amount: 12.00 },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4EBD0]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard View */}
      <main className="flex-1 p-8 sm:p-10 lg:p-12 overflow-y-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#425951] mb-8">Overview</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-[#d9cbb2]">
            <h3 className="text-lg font-medium text-[#667538]">Total Balance</h3>
            <p className="text-3xl font-bold text-[#425951]">${totalBalance.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-[#d9cbb2]">
            <h3 className="text-lg font-medium text-[#667538]">Total Income</h3>
            <p className="text-3xl font-bold text-[#667538]">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-[#d9cbb2]">
            <h3 className="text-lg font-medium text-[#667538]">Total Expenses</h3>
            <p className="text-3xl font-bold text-[#b88b5a]">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        {/* Spending by Category Graph (Placeholder) */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-10 border border-[#d9cbb2]">
          <h2 className="text-2xl font-semibold text-[#425951] mb-4">Spending by Category</h2>
          <div className="h-64 bg-[#f9f5ed] flex items-center justify-center text-[#667538] text-lg rounded-md border border-dashed border-[#b7d3a8]">
            [Graph Placeholder]
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-[#d9cbb2]">
          <h2 className="text-2xl font-semibold text-[#425951] mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#d9cbb2]">
              <thead className="bg-[#f9f5ed]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#f9f5ed]">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-[#fcfaf7] transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#425951]">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#425951]">{transaction.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#667538]">{transaction.category}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'Income' ? 'text-green-600' : 'text-[#b88b5a]'}`}>{transaction.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
