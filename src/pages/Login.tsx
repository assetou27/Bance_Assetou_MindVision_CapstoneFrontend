// src/pages/Login.tsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import '../styles/Login.css'; // Import your custom CSS design

/**
 * Login Component
 * ----------------
 * This component renders a two-panel layout:
 * - Left Panel: Branding and welcome message.
 * - Right Panel: Login form.
 *
 * It uses the global UserContext to call the login function. Upon successful login,
 * it redirects the user to the dashboard (or home). Errors are displayed if login fails.
 */
const Login: React.FC = () => {
  // Retrieve the login function from UserContext
  const { login } = useContext(UserContext);
  // useNavigate allows for programmatic redirection
  const navigate = useNavigate();

  // Local state for email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Local state to hold error messages if login fails
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submit
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setError(null);
    try {
      // Call the login function from context
      await login(email, password);
      // On successful login, redirect to the dashboard (or home page)
      navigate('/dashboard');
    } catch (err: any) {
      // Capture and display the error message if login fails
      setError(err.message);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT PANEL: Branding and Welcome Information */}
      <div className="login-left login-branding">
        <h1 className="welcome-title">
          Welcome to <br /> MindVision <span className="halo">🪐</span>
        </h1>
        <p className="welcome-subtext">
          Your journey to clarity and confidence starts here.
        </p>
        <ul className="benefits-list">
          <li>✓ Personal Growth</li>
          <li>✓ 1-on-1 Sessions</li>
          <li>✓ Secure & Confidential</li>
        </ul>
        <blockquote className="testimonial">
          <em>"Working with MindVision changed my life!"</em>
          <br />
          <span className="client-credit">- A grateful client 💜</span>
        </blockquote>
      </div>

      {/* RIGHT PANEL: Login Form */}
      <div className="login-right">
        <div className="login-container">
          <h1 className="login-title">Login to MindVision</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email address"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Display error if login fails */}
            {error && <div className="login-error">{error}</div>}
            {/* Submit Button */}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          {/* Link to the Register page */}
          <p className="signup-text">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
