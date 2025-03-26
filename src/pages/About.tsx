import React from 'react';
import { Link } from 'react-router-dom';

/**
 * About Component
 * Provides information about MindVision coaching practice and approach
 */
const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">About MindVision Coaching</h1>
          <p className="page-description">
            Learn about our coaching philosophy and the team behind MindVision
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2 className="section-title">Our Story</h2>
              <p>
                MindVision Coaching was founded in 2018 with a simple yet powerful mission: to help individuals
                unlock their full potential by developing mental clarity, emotional intelligence, and strategic vision.
              </p>
              <p>
                What began as a small practice has grown into a comprehensive coaching service that has
                helped hundreds of clients breakthrough barriers and achieve meaningful personal and professional growth.
              </p>
              <p>
                Our approach combines evidence-based coaching techniques with mindfulness practices
                and practical strategies that can be immediately applied to your life and work.
              </p>
            </div>
            <div className="content-image">
              {/* Image placeholder - replace with actual image in production */}
              <div className="image-placeholder">Our Story Image</div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Coach Section */}
      <section className="meet-coach">
        <div className="container">
          <h2 className="section-title">Meet Your Coach</h2>
          <div className="coach-profile">
            <div className="coach-image">
              {/* Coach image placeholder - replace with actual image in production */}
              <div className="image-placeholder">Coach Portrait</div>
            </div>
            <div className="coach-info">
              <h3 className="coach-name">Assetou Bance</h3>
              <p className="coach-title">Founder & Head Coach</p>
              <p className="coach-bio">
                With over 10 years of experience in personal development and coaching, Assetou has helped
                clients from diverse backgrounds overcome challenges and achieve their goals. She holds
                certifications in Life Coaching, Mindfulness-Based Stress Reduction, and Cognitive Behavioral Techniques.
              </p>
              <p className="coach-bio">
                Assetou's approach focuses on creating a supportive environment where clients feel empowered to
                explore their potential and develop practical strategies for growth. Her coaching style combines
                compassionate listening with strategic questioning to help clients gain new perspectives.
              </p>
              <p className="coach-credentials">
                <strong>Certifications:</strong> Certified Professional Coach (ICF), Mindfulness Practitioner,
                NLP Master Practitioner
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="our-approach">
        <div className="container">
          <h2 className="section-title">Our Coaching Approach</h2>
          <div className="approach-grid">
            {/* Approach Item 1 */}
            <div className="approach-item">
              <div className="approach-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3 className="approach-title">Personalized</h3>
              <p className="approach-description">
                We tailor our coaching to your unique needs, goals, and learning style.
                No one-size-fits-all solutions here.
              </p>
            </div>
            
            {/* Approach Item 2 */}
            <div className="approach-item">
              <div className="approach-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3 className="approach-title">Collaborative</h3>
              <p className="approach-description">
                We work together as partners in your growth journey, with you
                taking an active role in the process.
              </p>
            </div>
            
            {/* Approach Item 3 */}
            <div className="approach-item">
              <div className="approach-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3 className="approach-title">Results-Oriented</h3>
              <p className="approach-description">
                Our coaching focuses on creating tangible outcomes and measurable progress
                toward your goals.
              </p>
            </div>
            
            {/* Approach Item 4 */}
            <div className="approach-item">
              <div className="approach-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3 className="approach-title">Evidence-Based</h3>
              <p className="approach-description">
                We integrate proven techniques from psychology, neuroscience, and coaching
                best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Start Your Transformation?</h2>
          <p className="cta-description">
            Schedule a free 30-minute consultation to discuss your goals and how MindVision can help.
          </p>
          <Link to="/booking" className="btn btn-primary btn-large">Book Your Free Consultation</Link>
        </div>
      </section>
    </div>
  );
};

export default About;