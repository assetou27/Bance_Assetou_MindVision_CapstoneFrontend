import { api } from './api';
import { LoginCredentials, RegisterCredentials, User } from '../types/auth.types';

// Register user
export const register = async (userData: RegisterCredentials): Promise<{ token: string }> => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login user
export const login = async (credentials: LoginCredentials): Promise<{ token: string }> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data;
};