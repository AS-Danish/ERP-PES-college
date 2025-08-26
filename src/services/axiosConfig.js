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
    const originalRequest = error.config;

    // Handle login failures gracefully (don't treat as errors)
    if (originalRequest.url.includes('/') && error.response?.status === 401) {
      return Promise.resolve({
        data: { 
          success: false, 
          message: error.response.data?.message || 'Invalid credentials' 
        },
        status: 200 // Prevent console error
      });
    }

    // Only force logout/redirect for 401s on protected routes
    if (
      error.response?.status === 401 &&
      window.location.pathname !== '/' &&
      !originalRequest.url.includes('/')
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;