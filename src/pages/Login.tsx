// File: Login.tsx
import React, { useState } from 'react';
import './styles/Login.css';

const Login: React.FC = () => {
  // Track form input state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Track and display validation errors
  const [error, setError] = useState<string | null>(null);

  // Handle login form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic input validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // Clear error if inputs are valid
    setError(null);

    // Simulated login action (replace with real API later)
    console.log('Logging in with:', { email, password });
  };

  return (
    // Top-level page layout: 2-column split
    <div className="login-page">
      {/* Left column: Welcome message, branding */}
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

      {/* Right column: Login form */}
      <div className="login-right">
        <div className="login-container">
          {/* Title */}
          <h1 className="login-title">Login to MindVision</h1>

          {/* Login form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email input */}
            <input
              type="email"
              placeholder="Email address"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password input */}
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Error message, if any */}
            {error && <div className="login-error">{error}</div>}

            {/* Submit button */}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          {/* Link to sign-up page */}
          <p className="signup-text">
            Don’t have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
