// src/services/api.ts
import axios from 'axios';

// Create an Axios instance to be used for all API calls
const api = axios.create({
  // Base URL for your backend server. Adjust the URL if your backend is hosted elsewhere.
  baseURL: 'http://localhost:5000'
});

// You can add request/response interceptors here if you need to handle errors globally or log requests

export default api;
