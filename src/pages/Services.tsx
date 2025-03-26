// src/pages/Services.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

export default function Services() {
  return (
    <div className="services-container">
      {/* Header */}
      <div className="services-header">
        <h1>Services</h1>
        <p className="services-tagline">
          Personalized coaching solutions to transform your mindset and achieve your goals
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-section">
        <h2>Coaching Programs</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3>Discovery Session</h3>
              <div className="pricing-amount">$99</div>
              <p className="pricing-period">One-time session</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>90-minute deep dive consultation</li>
                <li>Personalized action plan</li>
                <li>Identify key limiting beliefs</li>
                <li>Goal setting framework</li>
              </ul>
            </div>
            <Link to="/register" className="pricing-cta">Get Started</Link>
          </div>

          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-card-header">
              <h3>Transformation Package</h3>
              <div className="pricing-amount">$497</div>
              <p className="pricing-period">Monthly</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>4 one-hour coaching sessions per month</li>
                <li>Weekly accountability check-ins</li>
                <li>Personalized growth exercises</li>
                <li>Email support between sessions</li>
                <li>Custom resource library access</li>
              </ul>
            </div>
            <Link to="/register" className="pricing-cta">Transform Your Life</Link>
          </div>

          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3>VIP Intensive</h3>
              <div className="pricing-amount">$1,997</div>
              <p className="pricing-period">3-month commitment</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>6 one-hour coaching sessions per month</li>
                <li>Unlimited text/email support</li>
                <li>Customized mindset training</li>
                <li>Personal development assessment</li>
                <li>VIP day (4 hours of focused coaching)</li>
                <li>Priority scheduling</li>
              </ul>
            </div>
            <Link to="/register" className="pricing-cta">Apply Now</Link>
          </div>

          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3>Executive Mastery</h3>
              <div className="pricing-amount">$2,997</div>
              <p className="pricing-period">3-month commitment</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>8 one-hour sessions per month</li>
                <li>Leadership development focus</li>
                <li>Strategic career planning</li>
                <li>Work-life balance optimization</li>
                <li>Communication skills enhancement</li>
                <li>Team dynamics coaching</li>
                <li>24/7 priority support</li>
              </ul>
            </div>
            <Link to="/register" className="pricing-cta">Elevate Your Leadership</Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <h2>How You'll Benefit</h2>
        <div className="benefits-container">
          <div className="benefit-item">
            <div className="benefit-icon">✨</div>
            <h3>Clarity & Direction</h3>
            <p>Gain crystal-clear vision on your goals and the optimal path to achieve them</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">💪</div>
            <h3>Confidence & Resilience</h3>
            <p>Develop unwavering self-belief and the ability to overcome any obstacle</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🚀</div>
            <h3>Accelerated Results</h3>
            <p>Achieve your goals faster with proven strategies and personalized guidance</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🔄</div>
            <h3>Lasting Transformation</h3>
            <p>Create sustainable change through new mindsets and empowering habits</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Life?</h2>
          <p>
            <span className="highlight">Take the first step</span> toward becoming your best self today.
          </p>
          <Link to="/register" className="cta-button">Begin Your Journey Now</Link>
        </div>
      </div>
    </div>
  );
}
