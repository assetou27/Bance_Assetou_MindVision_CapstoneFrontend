// src/components/Navbar.tsx

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import '../styles/Navbar.css';

export default function Navbar() {
  // Get current user object and logout function from UserContext
  const { user, logout } = useContext(UserContext);

  // Hook to navigate programmatically (e.g., redirect after logout)
  const navigate = useNavigate();

  // Track whether mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle user logout: clear auth state and go to homepage
  const handleLogout = () => {
    logout();       // Clear user state and remove token
    navigate('/');  // Redirect to home
  };

  // Toggle mobile menu open/closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when any link is clicked
  const closeMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / brand link - always shows */}
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu}>MindVision</Link>
        </div>

        {/* Hamburger icon for mobile menu toggle */}
        <div className="menu-icon" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'menu-icon-bar open' : 'menu-icon-bar'}></span>
          <span className={isMenuOpen ? 'menu-icon-bar open' : 'menu-icon-bar'}></span>
          <span className={isMenuOpen ? 'menu-icon-bar open' : 'menu-icon-bar'}></span>
        </div>

        {/* Navigation links - adapt to screen size */}
        <ul className={isMenuOpen ? 'navbar-links active' : 'navbar-links'}>
          {/* Always visible links */}
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/services" onClick={closeMenu}>Services</Link>
          </li>
          <li>
            <Link to="/blog" onClick={closeMenu}>Blog</Link>
          </li>

          {/* Conditional links based on auth status */}
          {user ? (
            <>
              {/* Only visible when logged in */}
              <li>
                <Link to="/appointments" onClick={closeMenu}>Appointments</Link>
              </li>
              <li>
                <Link to="/appointments/add" onClick={closeMenu}>Add Appointment</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className="logout-button"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Only visible when logged out */}
              <li>
                <Link to="/login" onClick={closeMenu}>Login</Link>
              </li>
              <li>
                <Link to="/register" onClick={closeMenu}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
