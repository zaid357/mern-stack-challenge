import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

export const fetchTransactions = async (month) => {
  const response = await axios.get(API_URL, {
    params: { month }
  });
  return response.data;
};