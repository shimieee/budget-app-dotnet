// API calls for transaction management
import axios from "./index";

// This file contains API calls for managing transactions
// get all transactions
export const getTransactions = async () => {
  const response = await axios.get("/transaction");
  return response.data;
};
// create a new transaction
export const createTransaction = async (transaction) => {
  const response = await axios.post("/transaction", transaction);
  return response.data;
};
// delete a transaction by id
export const deleteTransaction = async (id) => {
  const response = await axios.delete(`/transaction/${id}`);
  return response.data;
};
// update a transaction by id
export const updateTransaction = async (id, transaction) => {
  const response = await axios.put(`/transaction/${id}`, transaction);
  return response.data;
};