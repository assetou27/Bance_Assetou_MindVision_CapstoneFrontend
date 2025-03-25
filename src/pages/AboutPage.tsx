// src/pages/AboutPage.tsx

import React from "react";
import "../styles/AboutPage.css";

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <section className="about-section">
        <h1>About MindVision 🌟</h1>
        <p>
          MindVision is a platform created to help individuals connect with certified coaches
          to support their growth, clarity, and confidence.
        </p>
        <p>
          Whether you're navigating life changes, career transitions, or seeking clarity on your
          personal goals — our trusted coaches are here to guide you.
        </p>
      </section>

      <section className="contact-section">
        <h2>Contact Us 📬</h2>
        <p>Email: support@mindvision.co</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Location: 123 Vision Way, Insight City, CA</p>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} MindVision. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
