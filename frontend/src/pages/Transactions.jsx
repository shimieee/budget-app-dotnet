import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState([
    { id: 1, date: "2023-10-26", description: "Coffee Shop", category: "Food", amount: -5.50, type: "Expense" },
    { id: 2, date: "2023-10-25", description: "Monthly Salary", category: "Income", amount: 2500.00, type: "Income" },
    { id: 3, date: "2023-10-24", description: "Supermarket", category: "Food", amount: -90.15, type: "Expense" },
    { id: 4, date: "2023-10-23", description: "Electricity Bill", category: "Utilities", amount: -80.00, type: "Expense" },
    { id: 5, date: "2023-10-22", description: "Train Ticket", category: "Transport", amount: -12.00, type: "Expense" },
    { id: 6, date: "2023-10-21", description: "Freelance Payment", category: "Income", amount: 500.00, type: "Income" },
    { id: 7, date: "2023-10-20", description: "Concert Tickets", category: "Entertainment", amount: -150.00, type: "Expense" },
    { id: 8, date: "2023-10-19", description: "New Jeans", category: "Shopping", amount: -85.00, type: "Expense" },
  ]);

  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState("Food"); // Default category
  const [newType, setNewType] = useState("Expense"); // Default type

  // Dummy list of available categories for the dropdown
  const availableCategories = [
    "Food", "Transport", "Rent", "Utilities", "Entertainment", "Shopping", "Savings", "Health", "Income"
  ];

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (newDescription.trim() === "" || newAmount === "" || newDate.trim() === "") return;

    const parsedAmount = parseFloat(newAmount);
    if (isNaN(parsedAmount)) return;

    const finalAmount = newType === "Expense" ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

    const newTransaction = {
      id: transactionsData.length + 1, // Simple ID generation
      date: newDate,
      description: newDescription.trim(),
      category: newCategory,
      amount: finalAmount,
      type: newType,
    };

    setTransactionsData([...transactionsData, newTransaction]);
    setNewDate("");
    setNewDescription("");
    setNewAmount("");
  };

  return (
    <div className="flex min-h-screen bg-[#F4EBD0]">
      <Sidebar />

      <div className="flex-1 p-8 sm:p-12 lg:p-16 overflow-y-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#425951] mb-10 text-center">All Transactions</h1>
        
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-10 border border-[#d9cbb2]">
          <h2 className="text-2xl font-semibold text-[#425951] mb-4">Add New Transaction</h2>
          <form onSubmit={handleAddTransaction} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="transactionDate" className="block text-sm font-medium text-[#667538] mb-1">Date</label>
              <input
                id="transactionDate"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d3a8] bg-[#f9f5ed] text-[#425951]"
              />
            </div>
            <div>
              <label htmlFor="transactionDescription" className="block text-sm font-medium text-[#667538] mb-1">Description</label>
              <input
                id="transactionDescription"
                type="text"
                placeholder="e.g., Groceries, Salary"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d3a8] bg-[#f9f5ed] text-[#425951]"
              />
            </div>
            <div>
              <label htmlFor="transactionAmount" className="block text-sm font-medium text-[#667538] mb-1">Amount</label>
              <input
                id="transactionAmount"
                type="number"
                step="0.01"
                placeholder="e.g., 50.00"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d3a8] bg-[#f9f5ed] text-[#425951]"
              />
            </div>
            <div>
              <label htmlFor="transactionCategory" className="block text-sm font-medium text-[#667538] mb-1">Category</label>
              <select
                id="transactionCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d3a8] bg-[#f9f5ed] text-[#425951]"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="transactionType" className="block text-sm font-medium text-[#667538] mb-1">Type</label>
              <select
                id="transactionType"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d3a8] bg-[#f9f5ed] text-[#425951]"
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-3 flex justify-end items-end">
              <button
                type="submit"
                className="bg-[#b88b5a] text-white px-6 py-2 rounded-md hover:bg-[#a07a4a] transition w-full md:w-auto"
              >
                Add Transaction
              </button>
            </div>
          </form>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 border border-[#d9cbb2]">
          <h2 className="text-2xl font-semibold text-[#425951] mb-4">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#d9cbb2]">
              <thead className="bg-[#f9f5ed]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#f9f5ed]">
                {transactionsData.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-[#fcfaf7] transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#425951]">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#425951]">{transaction.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#667538]">{transaction.category}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>{transaction.type}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'Income' ? 'text-green-600' : 'text-[#b88b5a]'}`}>{transaction.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions; 