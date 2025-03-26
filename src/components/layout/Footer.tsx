import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * Global footer displayed on all pages
 * Contains site information, quick links, and contact details
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Information Section */}
        <div className="footer-section">
          <h3 className="footer-title">MindVision Coaching</h3>
          <p className="footer-description">
            Empowering individuals to achieve their full potential through mindful coaching and personal development.
          </p>
        </div>
        
        {/* Quick Links Section */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/booking">Book a Session</Link></li>
          </ul>
        </div>
        
        {/* Contact Information Section */}
        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <address className="footer-contact">
            <p>Email: contact@mindvision-coaching.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Mindful Street, Awareness City</p>
          </address>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} MindVision Coaching. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;