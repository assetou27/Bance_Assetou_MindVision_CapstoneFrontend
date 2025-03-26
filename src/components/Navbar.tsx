// src/components/Navbar.tsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import '../styles/Navbar.css';

export default function Navbar() {
  // Get current user and logout function from UserContext
  const { user, logout } = useContext(UserContext);
  // useNavigate allows programmatic navigation (redirection)
  const navigate = useNavigate();
  // State to track mobile menu open/closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle logout: clear user state and redirect to home page
  const handleLogout = () => {
    logout();       // Clear the user from context and localStorage
    navigate('/');  // Redirect the user back to the home page
  };

  // Toggle mobile menu open/closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a link is clicked (mobile only)
  const closeMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Link back to the Home page */}
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu}>MindVision</Link>
        </div>

        {/* Mobile menu toggle button */}
        <div className="menu-icon" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'menu-icon-bar open' : 'menu-icon-bar'}></span>
          <span className={isMenuOpen ? 'menu-icon-bar open' : 'menu-icon-bar'}></span>
          <span className={isMenuOpen ? 'menu-icon-bar open' : 'menu-icon-bar'}></span>
        </div>

        {/* Navigation links - with conditional active class for mobile */}
        <ul className={isMenuOpen ? 'navbar-links active' : 'navbar-links'}>
          <li>
            {/* Always show Home link */}
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          {user ? (
            // If user is logged in, show additional links for Dashboard and Profile, plus Logout button
            <>
              <li>
                <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
              </li>
              <li>
                <Link to="/profile" onClick={closeMenu}>Profile</Link>
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
            // If user is not logged in, show the Login link
            <li>
              <Link to="/login" onClick={closeMenu}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}