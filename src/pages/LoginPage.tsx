// File: src/pages/Login.tsx

import React, { useState } from 'react';
import api from '../api/axios'; // ✅ Axios instance to call backend
import './styles/Login.css';

const Login: React.FC = () => {
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // To show error messages if login fails
  const [error, setError] = useState<string | null>(null);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setError(null); // Clear previous errors

    try {
      // ✅ POST request to your backend
      const res = await api.post('/auth/login', { email, password });

      const { token, user } = res.data;

      // 💾 Save token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userId', user._id);

      // 🔁 Redirect to dashboard on success
      window.location.href = '/dashboard';
    } catch (err) {
      // ❌ Handle error (wrong credentials, network, etc.)
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT: Branding / Welcome */}
      <div className="login-left login-branding">
        <h1 className="welcome-title">
          Welcome to <br /> MindVision <span className="halo">🪐</span>
        </h1>
        <p className="welcome-subtext">Your journey to clarity and confidence starts here.</p>
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

      {/* RIGHT: Login Form */}
      <div className="login-right">
        <div className="login-container">
          <h1 className="login-title">Login to MindVision</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Show error if login fails */}
            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
