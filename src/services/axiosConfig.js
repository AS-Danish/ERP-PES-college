// Fixed axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    // Handle token expiration
    if (error.response?.status === 401) {
      const errorData = error.response.data;
      if (errorData?.error === 'TOKEN_EXPIRED' || errorData?.error === 'INVALID_TOKEN') {
        // Clear stored token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // You can dispatch a logout action here if using Redux
        console.error('Token expired or invalid. Please log in again.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;