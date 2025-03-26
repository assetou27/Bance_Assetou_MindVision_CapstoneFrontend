import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

/**
 * Navigation Component
 * Main navigation bar for the application
 * Shows different options based on authentication state
 */
const Navigation = () => {
  // Get auth context for user state and logout function
  const { user, logout } = useContext(AuthContext);
  
  // Navigate hook for redirection after logout
  const navigate = useNavigate();

  /**
   * Handle user logout
   * Calls the logout function and redirects to login page
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Brand/Logo */}
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">MindVision</Link>
      </div>
      
      {/* Main Navigation Links */}
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/about" className="navbar-item">About</Link>
        <Link to="/services" className="navbar-item">Services</Link>
        <Link to="/blog" className="navbar-item">Blog</Link>
        <Link to="/booking" className="navbar-item">Book a Session</Link>
      </div>
      
      {/* Authentication Links - Changes based on auth state */}
      <div className="navbar-end">
        {user ? (
          // Logged in state - show dashboard and logout
          <>
            <Link to="/dashboard" className="navbar-item">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </>
        ) : (
          // Logged out state - show login and register
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;