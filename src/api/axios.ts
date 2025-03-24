// src/api/axios.ts
import axios from 'axios';

// Create a reusable Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // fallback if env missing
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
