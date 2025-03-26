import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

/**
 * PrivateRoute Component
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @returns {React.ReactNode} The protected route or redirect
 */
const PrivateRoute = ({ children }) => {
  // Get authentication state from context
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Show loading indicator while auth state is being checked
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Redirect to login if user is not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  // Render the protected route if user is authenticated
  return children;
};

export default PrivateRoute;

