// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

// Define a TypeScript interface for the structure of the quote
interface Quote {
  content: string;
  author: string;
}

export default function Home() {
  // State to hold the fetched quote; initially null
  const [quote, setQuote] = useState<Quote | null>(null);
  // State to hold any error message during fetch
  const [error, setError] = useState<string | null>(null);

  // Function to fetch a random motivational quote from the external API
  const fetchQuote = async () => {
    try {
      // Send GET request to the quotable API
      const response = await fetch('http://api.quotable.io/quotes/random');
      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      // Parse the JSON data from the response
      const data = await response.json();
      // The API returns an array; we use the first quote from the array
      setQuote(data[0]);
    } catch (err: any) {
      // If an error occurs, update the error state with the error message
      setError(err.message);
    }
  };

  // useEffect hook to run fetchQuote only once when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to MindVision Coaching</h1>
            <p className="hero-subtitle">Empower yourself with inspiration!</p>
            <button className="cta-button">Book Your Free Consultation</button>
          </div>
          <div className="hero-image">
            <div className="profile-circle">
             <img src="/Image1.jpg" alt="Profile" />
            </div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>About My Coaching</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I help clients unlock their full potential through personalized coaching strategies that address mindset, goals, and personal growth. My approach combines proven psychological techniques with practical strategies for real-world results.</p>
            <p>Every coaching journey is tailored to your unique needs and aspirations, creating a supportive space where transformation happens naturally.</p>
          </div>
        </div>
      </div>

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

      <div className="coaching-approach">
        <h2>My Coaching Approach</h2>
        <div className="approach-cards">
          <div className="approach-card">
            <div className="card-icon">🧠</div>
            <h3>Mindset Transformation</h3>
            <p>Identify and reframe limiting beliefs that hold you back from reaching your full potential.</p>
          </div>
          <div className="approach-card">
            <div className="card-icon">🎯</div>
            <h3>Strategic Goal Setting</h3>
            <p>Create meaningful goals with clear action steps aligned with your values and aspirations.</p>
          </div>
          <div className="approach-card">
            <div className="card-icon">⚡</div>
            <h3>Sustainable Growth</h3>
            <p>Develop habits and systems that support long-term success and continued personal evolution.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Transform Your Life?</h2>
        <p>Take the first step toward becoming your best self.</p>
        <button className="cta-button">Start Your Journey</button>
      </div>
    </div>
  );
}