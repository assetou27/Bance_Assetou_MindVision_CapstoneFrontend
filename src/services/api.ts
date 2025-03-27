// src/services/api.ts
import axios from 'axios';

/**
 * Creates an Axios instance for all API calls.
 * 
 * We use an environment variable for the baseURL. If it's not set,
 * we fall back to your Render-deployed backend.
 * 
 * If your routes are like "/api/auth", "/api/appointments", etc.,
 * then you just need the domain here.
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    || 'https://bance-assetou-mindvision-capstonebackend.onrender.com',
});

export default api;
