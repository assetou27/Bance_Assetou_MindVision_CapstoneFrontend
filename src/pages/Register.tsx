// src/pages/Register.tsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // Your custom CSS design for the register page
import { UserContext } from '../hooks/UserContext';

/**
 * Register Component
 * ------------------
 * This component renders the registration form with a two-panel layout.
 * The left panel contains branding and feature information, while the right panel 
 * contains the form where a user can register.
 *
 * When the form is submitted, it calls the register function from UserContext.
 * Upon successful registration, it fetches the full user info via GET /api/auth/me,
 * stores the data (including the JWT token) in the context, and redirects the user
 * to the dashboard.
 */
const Register: React.FC = () => {
  // Local state to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
  });
  
  // Local state for displaying success/error messages to the user
  const [message, setMessage] = useState<string>('');
  
  // Get the register function from the global UserContext
  const { register } = useContext(UserContext);
  // useNavigate hook to programmatically navigate to a different route after registration
  const navigate = useNavigate();

  // Handle input changes by updating the formData state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the register function from context, which performs the registration 
      // and immediately fetches the user info via GET /api/auth/me.
      await register(formData.name, formData.email, formData.password);
      // If registration is successful, update the message state
      setMessage('✅ Registration successful!');
      // Redirect the user to the dashboard (or home) page
      navigate('/dashboard');
    } catch (err: any) {
      console.error('❌ Registration failed:', err.response?.data || err.message);
      // Display the error message from the backend, if available
      setMessage(err.response?.data?.msg || '❌ Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      {/* Left Panel: Branding and Features */}
      <div className="left-panel">
        <h1>Welcome to MindVision 💫</h1>
        <p>Your journey to clarity and confidence starts here.</p>
        <div className="feature-list">
          <p>✔ Personal Growth</p>
          <p>✔ 1-on-1 Sessions</p>
          <p>✔ Secure & Confidential</p>
        </div>
        <div className="testimonial">
          <em>"Working with MindVision changed my life!"</em>
          <p>- A grateful client 💜</p>
        </div>
      </div>

      {/* Right Panel: Registration Form */}
      <div className="right-panel">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="client">Client</option>
            <option value="coach">Coach</option>
          </select>

          <button type="submit">Sign Up</button>

          {/* Display success or error message */}
          <p className="message">{message}</p>

          <p className="link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
