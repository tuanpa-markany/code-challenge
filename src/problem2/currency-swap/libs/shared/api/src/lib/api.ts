import axios from 'axios';

const API_URL = 'https://interview.switcheo.com/prices.json';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000, // Set a timeout to prevent hanging requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch token prices
export const fetchTokenPrices = async () => {
  try {
    const response = await apiClient.get(''); // Base URL already set
    return response.data;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    throw error; // Ensures React Query handles errors properly
  }
};
