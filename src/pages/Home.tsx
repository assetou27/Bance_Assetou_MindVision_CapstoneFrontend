import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

// Shape of quote from API
interface Quote {
  content: string;
  author: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch quote from quotable API (using HTTPS to avoid mixed-content issues)
  const fetchQuote = async () => {
    try {
      // This endpoint returns an array with one quote object
      const response = await fetch('https://api.quotable.io/quotes/random');
      if (!response.ok) throw new Error('Failed to fetch quote');
      const data = await response.json();
      // data is an array of length 1, so we use data[0]
      setQuote(data[0]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Load quote on mount
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="home-container">
      {/* 👋 Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to MindVision Coaching</h1>
            <p className="hero-subtitle">Empower yourself with inspiration!</p>
            <button className="cta-button" onClick={() => navigate('/login')}>
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

      {/* 📘 About Section */}
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

        {/* 💎 Coaching Approach Section (NEW) */}
        <div className="benefits-section">
          <h2>My Coaching Approach</h2>
          <div className="benefits-container">
            <div className="benefit-item">
              <div className="benefit-icon">🧠</div>
              <h3>Mindset Transformation</h3>
              <p>
                Identify and reframe limiting beliefs that hold you back from
                reaching your full potential.
              </p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <h3>Strategic Goal Setting</h3>
              <p>
                Create meaningful goals with clear action steps aligned with your
                values and aspirations.
              </p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <h3>Sustainable Growth</h3>
              <p>
                Develop habits and systems that support long-term success and
                continued personal evolution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 💬 Quote Section */}
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
