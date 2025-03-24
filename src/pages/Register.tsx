import React, { useState } from 'react';
import axios from 'axios';
import './styles/Register.css'; // CSS file for styling
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
  });

  // Message to show feedback (success or error)
  const [message, setMessage] = useState('');

  // Handle input field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send form data to backend
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(res.data);
      setMessage('✅ Registration successful!');
    } catch (err) {
      setMessage('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      {/* Left Panel - Branding and Features */}
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

      {/* Right Panel - Registration Form */}
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

          {/* Show feedback message */}
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
