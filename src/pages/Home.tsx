// src/pages/Home.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🧭 Enables programmatic routing
import '../styles/Home.css';

interface Quote {
  content: string;
  author: string;
}

export default function Home() {
  const navigate = useNavigate(); // 📦 React Router hook for navigation
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Fetch a random quote from API
  const fetchQuote = async () => {
    try {
      const response = await fetch('http://api.quotable.io/quotes/random');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data[0]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 📅 Fetch quote on component mount
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="home-container">
      {/* 💬 Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to MindVision Coaching</h1>
            <p className="hero-subtitle">Empower yourself with inspiration!</p>
            {/* 🔗 Button that routes to login page */}
            <button
              className="cta-button"
              onClick={() => navigate('/login')}
            >
              Book Your Free Consultation
            </button>
          </div>
          <div className="hero-image">
            <div className="profile-circle">
              <img src="/Image1.jpg" alt="Profile" />
            </div>
          </div>
        </div>
      </div>

      {/* 📌 About Section */}
      <div className="about-section">
        <h2>About My Coaching</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I help clients unlock their full potential through personalized
              coaching strategies that address mindset, goals, and personal
              growth. My approach combines proven psychological techniques with
              practical strategies for real-world results.
            </p>
            <p>
              Every coaching journey is tailored to your unique needs and
              aspirations, creating a supportive space where transformation
              happens naturally.
            </p>
          </div>
        </div>
      </div>

      {/* ✨ Quote Section */}
      <div className="quote-section">
        {error && <p className="error">{error}</p>}
        {quote ? (
          <blockquote className="quote">
            <p>"{quote.content}"</p>
            <footer>- {quote.author}</footer>
          </blockquote>
        ) : (
          <p className="loading">Loading quote...</p>
        )}
        <button className="refresh-quote" onClick={fetchQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
}
