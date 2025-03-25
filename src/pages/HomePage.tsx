// src/pages/HomePage.tsx

import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to MindVision 💫</h1>
      <p>Your journey to clarity and confidence starts here.</p>

      <div className="home-links">
        <Link to="/login" className="home-btn">
          Login
        </Link>
        <Link to="/register" className="home-btn">
          Register
        </Link>
        <Link to="/dashboard" className="home-btn">
          Dashboard
        </Link>
        <Link to="/book" className="home-btn">
          Book a Session
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
