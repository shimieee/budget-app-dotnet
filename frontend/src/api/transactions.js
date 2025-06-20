// API calls for transaction management
import axios from "./index";

export const getTransactions = async () => {
  const response = await axios.get("/transaction");
  return response.data;
};

export const createTransaction = async (transaction) => {
  const response = await axios.post("/transaction", transaction);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`/transaction/${id}`);
  return response.data;
};

export const updateTransaction = async (id, transaction) => {
  const response = await axios.put(`/transaction/${id}`, transaction);
  return response.data;
};