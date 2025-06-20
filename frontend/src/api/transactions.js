import api from './index';

// GET all transactions for a user
export const fetchTransactions = (userId) =>
  api.get(`/transactions/user/${userId}`);

// POST a new transaction
export const addTransaction = (transaction) =>
  api.post('/transactions', transaction);

// PUT to update a transaction
export const updateTransaction = (id, transaction) =>
  api.put(`/transactions/${id}`, transaction);

// DELETE a transaction
export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`);