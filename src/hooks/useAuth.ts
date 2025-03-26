import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Custom hook for accessing authentication context
 * Provides a simpler way to access auth state and functions
 * 
 * @returns Authentication context with user data and auth functions
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;