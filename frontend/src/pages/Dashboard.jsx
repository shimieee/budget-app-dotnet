import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { fetchCategories } from "../api/categories";
import { getTransactions } from "../api/transactions";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Define colors for the bar chart
const COLORS = ["#b88b5a", "#b7d3a8", "#667538", "#425951", "#e9e5d6", "#a07a4a", "#3b7a57", "#b7a16a"];

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [cats, txs] = await Promise.all([
          fetchCategories(),
          getTransactions()
        ]);
        setCategories(cats);
        setTransactions(txs);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Calculate totals dynamically
  const totalBalance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);

  // Recent transactions (sorted by date desc, take 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Spending by category (only negative/expense amounts)
  const spendingByCategory = categories.map(cat => {
    const catTxs = transactions.filter(t => t.categoryId === cat.id && t.amount < 0);
    const total = catTxs.reduce((acc, t) => acc + Math.abs(t.amount), 0);
    return { name: cat.name, value: total };
  }).filter(cat => cat.value > 0);

  if (loading) return <div className="p-8 text-[#667538]">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-[#F4EBD0]">
        <Sidebar />
        <main className="flex-1 p-8 sm:p-10 lg:p-12 overflow-y-auto pb-10">
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
              <p className="text-3xl font-bold text-[#b88b5a]">${Math.abs(totalExpenses).toFixed(2)}</p>
            </div>
          </div>

          {/* Spending by Category Bar Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-[#d9cbb2]">
            <h2 className="text-2xl font-semibold text-[#425951] mb-2">Spending by Category</h2>
            <p className="text-[#667538] mb-6 text-sm">See where your money goes this month</p>
            <div className="flex flex-col items-center justify-center">
              {spendingByCategory.length === 0 ? (
                <span className="text-[#667538]">No expense data to display.</span>
              ) : (
                <ResponsiveContainer width="100%" height={340}>
                  <BarChart
                    data={spendingByCategory}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <XAxis dataKey="name" stroke="#425951" fontSize={14} />
                    <YAxis stroke="#425951" fontSize={14} />
                    <Tooltip
                      formatter={value => `$${value.toFixed(2)}`}
                      contentStyle={{ background: "#f9f5ed", borderRadius: "8px", color: "#425951" }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {spendingByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#667538] uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#f9f5ed]">
                  {recentTransactions.map((transaction) => {
                    const category = categories.find(cat => cat.id === transaction.categoryId);
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
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
