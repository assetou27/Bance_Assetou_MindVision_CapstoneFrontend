import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Base API URL for backend requests
const API_URL = 'http://localhost:5000/api';

/**
 * Create the authentication context
 * Will be used to share authentication state across components
 */
export const AuthContext = createContext(null);

/**
 * Authentication Provider Component
 * Manages user authentication state and provides auth-related functions
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with the provider
 */
export const AuthProvider = ({ children }) => {
  // User state - stores authenticated user information
  const [user, setUser] = useState(null);
  
  // Loading state - indicates when auth operations are in progress
  const [loading, setLoading] = useState(true);
  
  // Error state - stores authentication error messages
  const [error, setError] = useState(null);

  /**
   * On component mount, check if user is already logged in
   * Retrieves user data from localStorage if it exists
   */
  useEffect(() => {
    // Check for stored user data in localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      // Parse the stored user data
      const parsedUser = JSON.parse(storedUser);
      
      // Update the user state
      setUser(parsedUser);
      
      // Set auth token for all future API requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
    }
    
    // Complete initialization
    setLoading(false);
  }, []);

  /**
   * Register a new user
   * 
   * @param {Object} userData - User registration data
   * @returns {Object} The created user with auth token
   * @throws {Error} If registration fails
   */
  const register = async (userData) => {
    try {
      // Reset any previous errors
      setError(null);
      
      // Send registration request to API
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      // Extract token and user data from response
      const { token, ...userInfo } = response.data;
      const authUser = { ...userInfo, token };
      
      // Save to state and localStorage
      setUser(authUser);
      localStorage.setItem('user', JSON.stringify(authUser));
      
      // Set auth token for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return authUser;
    } catch (err) {
      // Handle and store error
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  /**
   * Login an existing user
   * 
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Object} The authenticated user with token
   * @throws {Error} If login fails
   */
  const login = async (email, password) => {
    try {
      // Reset any previous errors
      setError(null);
      
      // Send login request to API
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      // Extract token and user info from response
      const { token, ...userInfo } = response.data;
      const authUser = { ...userInfo, token };
      
      // Save to state and localStorage
      setUser(authUser);
      localStorage.setItem('user', JSON.stringify(authUser));
      
      // Set auth token for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return authUser;
    } catch (err) {
      // Handle and store error
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  /**
   * Logout the current user
   * Removes user data from state and localStorage
   */
  const logout = () => {
    // Clear user state
    setUser(null);
    
    // Remove from localStorage
    localStorage.removeItem('user');
    
    // Remove auth token from future requests
    delete axios.defaults.headers.common['Authorization'];
  };

  /**
   * Check if user is authenticated
   * 
   * @returns {boolean} True if user is authenticated, false otherwise
   */
  const isAuthenticated = () => {
    return !!user;
  };

  // Provide auth state and functions to children components
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;