import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getTransactions, createTransaction } from "../api/transactions";
import { fetchCategories } from "../api/categories";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [txRes, catRes] = await Promise.all([
          getTransactions(),
          fetchCategories()
        ]);
        setTransactionsData(txRes);
        setCategories(catRes);
        setSelectedCategoryId(catRes[0]?.id || "");
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setError("");
    if (!newTitle.trim() || !newAmount || !newDate || !selectedCategoryId) return;
    const parsedAmount = parseFloat(newAmount);
    if (isNaN(parsedAmount)) return;
    const newTransaction = {
      title: newTitle.trim(),
      amount: parsedAmount,
      date: newDate,
      categoryId: selectedCategoryId,
    };
    try {
      const created = await createTransaction(newTransaction);
      setTransactionsData([created, ...transactionsData]);
      setNewDate("");
      setNewTitle("");
      setNewAmount("");
      setSelectedCategoryId(categories[0]?.id || "");
    } catch (err) {
      setError("Failed to add transaction");
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-[#F4EBD0]">
        <Sidebar />
        <div className="flex-1 p-8 sm:p-10 lg:p-12 overflow-y-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#425951] mb-8">All Transactions</h1>
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
                <label htmlFor="transactionTitle" className="block text-sm font-medium text-[#667538] mb-1">Title</label>
                <input
                  id="transactionTitle"
                  type="text"
                  placeholder="e.g., Groceries, Salary"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
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
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#b7d3a8] bg-[#f9f5ed] text-[#425951]"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
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
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </div>

          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 border border-[#d9cbb2]">
            <h2 className="text-2xl font-semibold text-[#425951] mb-4">Transaction History</h2>
            {loading ? (
              <div className="text-[#667538]">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#d9cbb2]">
                  <thead className="bg-[#f9f5ed]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Title</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#f9f5ed]">
                    {transactionsData.map((transaction) => {
                      const category = categories.find((cat) => cat.id === transaction.categoryId);
                      return (
                        <tr key={transaction.id} className="hover:bg-[#fcfaf7] transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#425951]">{transaction.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#425951]">{transaction.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#667538]">{category ? category.name : "-"}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-[#b88b5a]'}`}>{transaction.amount.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions; 