import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Component
 * Landing page for the MindVision coaching website
 * Showcases main services and features with a call to action
 */
const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Mind, Transform Your Life</h1>
          <p className="hero-subtitle">
            MindVision coaching helps you break through mental barriers and achieve your highest potential
          </p>
          <div className="hero-cta">
            <Link to="/booking" className="btn btn-primary">Book a Free Consultation</Link>
            <Link to="/services" className="btn btn-outline">Explore Services</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">How MindVision Can Help You</h2>
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3 className="feature-title">Personal Growth</h3>
              <p className="feature-description">
                Discover your true potential and overcome limiting beliefs with personalized coaching sessions.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="feature-title">Career Development</h3>
              <p className="feature-description">
                Navigate career transitions, improve leadership skills, and achieve professional goals.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3 className="feature-title">Work-Life Balance</h3>
              <p className="feature-description">
                Create harmony between your professional ambitions and personal wellbeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonials-slider">
            {/* Testimonial 1 */}
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Working with MindVision has completely transformed how I approach challenges. I've gained confidence and clarity I never thought possible."
              </p>
              <div className="testimonial-author">
                <span className="author-name">Sarah Johnson</span>
                <span className="author-title">Marketing Executive</span>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The coaching sessions provided me with practical tools to overcome anxiety and focus on my goals. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <span className="author-name">Michael Chen</span>
                <span className="author-title">Software Developer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Begin Your Journey?</h2>
          <p className="cta-description">
            Take the first step toward personal transformation with a free 30-minute consultation.
          </p>
          <Link to="/booking" className="btn btn-primary btn-large">Book Your Session Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;