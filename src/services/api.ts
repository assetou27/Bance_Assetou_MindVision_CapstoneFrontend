// src/services/api.ts
import axios from 'axios';

// Use environment variable, fallback to localhost if not set
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

export default api;
