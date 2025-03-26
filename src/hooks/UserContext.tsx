// src/hooks/UserContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import api from '../services/api';

// Define the structure for our user data
interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

// Define the context interface including login, register, logout, and update functions.
interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Create the context with default (dummy) implementations.
export const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {}
});

// Provider props type.
interface Props {
  children: ReactNode;
}

// The UserProvider wraps the app and provides authentication state.
export const UserProvider = ({ children }: Props) => {
  // Initialize user state from localStorage for persistence.
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update localStorage and the Axios default header whenever user state changes.
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
    }
  }, [user]);

  // Login function: calls POST /api/auth/login then GET /api/auth/me to get user info.
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const token = response.data.token;
      // Set the token in the default header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Now fetch the user info using GET /api/auth/me
      const meResponse = await api.get('/api/auth/me');
      const userData = { ...meResponse.data, token };
      setUser(userData);
    } catch (err: any) {
      throw new Error(err.response?.data?.msg || 'Login failed');
    }
  };

  // Register function: calls POST /api/auth/register then GET /api/auth/me.
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      const token = response.data.token;
      // Set the token in the default header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Now fetch the user info using GET /api/auth/me
      const meResponse = await api.get('/api/auth/me');
      const userData = { ...meResponse.data, token };
      setUser(userData);
    } catch (err: any) {
      throw new Error(err.response?.data?.msg || 'Registration failed');
    }
  };

  // Logout function: clears the user state.
  const logout = () => {
    setUser(null);
  };

  // updateUser function: merges new user data with the existing state.
  const updateUser = (userData: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...userData } : null));
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
