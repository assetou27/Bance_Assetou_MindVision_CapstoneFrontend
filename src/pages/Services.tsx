import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';
import Card from '../components/common/Card';
import ServiceCard from '../components/service/ServiceCard';

// API base URL - should match your backend
const API_URL = 'http://localhost:5000/api';

/**
 * Service interface defining the structure of a coaching service
 */
interface Service {
  _id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  image?: string;
}

/**
 * Services Component
 * Displays all coaching services offered
 * Fetches service data from the backend API
 */
const Services: React.FC = () => {
  // State for storing services data
  const [services, setServices] = useState<Service[]>([]);
  
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  
  // State for error messages
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch services data from the API on component mount
   */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        
        // Make API request to get services
        const response = await axios.get(`${API_URL}/services`);
        
        // Update state with fetched data
        setServices(response.data);
        
        // Clear any previous errors
        setError(null);
      } catch (err) {
        // Handle and store error
        setError('Failed to load services. Please try again later.');
        console.error('Error fetching services:', err);
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchServices();
  }, []);

  // Fallback services data in case API is not available yet
  const fallbackServices: Service[] = [
    {
      _id: '1',
      title: 'Personal Development Coaching',
      description: 'Unlock your potential and overcome barriers to personal growth with tailored coaching sessions focused on self-awareness, goal setting, and developing new skills and perspectives.',
      duration: 60,
      price: 120,
    },
    {
      _id: '2',
      title: 'Career Coaching',
      description: 'Navigate career transitions, advance in your current role, or find greater job satisfaction with strategic coaching that helps you clarify goals, develop leadership skills, and create actionable plans.',
      duration: 60,
      price: 150,
    },
    {
      _id: '3',
      title: 'Life Balance Coaching',
      description: 'Create harmony between your professional ambitions and personal well-being with coaching that addresses stress management, boundary setting, and priorities alignment.',
      duration: 90,
      price: 180,
    },
    {
      _id: '4',
      title: 'Mindfulness Training',
      description: 'Learn practical mindfulness techniques to reduce stress, improve focus, and develop greater awareness in your daily life through guided practices and personalized mindfulness strategies.',
      duration: 45,
      price: 100,
    }
  ];

  return (
    <div className="services-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Our Coaching Services</h1>
          <p className="page-description">
            Discover how MindVision coaching can help you achieve your personal and professional goals
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          {/* Show loading state while fetching data */}
          {loading && (
            <Loading text="Loading services..." />
          )}

          {/* Show error message if fetch failed */}
          {!loading && error && (
            <Alert type="error" title="Error Loading Services">
              {error}
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary mt-3"
              >
                Try Again
              </button>
            </Alert>
          )}

          {/* Display services list */}
          {!loading && !error && (
            <div className="services-grid">
              {/* Use fetched services or fallback if API fetch failed but no error */}
              {(services.length > 0 ? services : fallbackServices).map((service) => (
                <ServiceCard 
                  key={service._id}
                  service={service}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Our Coaching Process</h2>
          <div className="process-steps">
            {/* Step 1 */}
            <div className="process-step">
              <div className="step-number">1</div>
              <h3 className="step-title">Free Consultation</h3>
              <p className="step-description">
                Begin with a free 30-minute consultation to discuss your goals and determine if we're a good fit.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="process-step">
              <div className="step-number">2</div>
              <h3 className="step-title">Assessment & Planning</h3>
              <p className="step-description">
                Identify your strengths, challenges, and develop a personalized coaching plan.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="process-step">
              <div className="step-number">3</div>
              <h3 className="step-title">Regular Sessions</h3>
              <p className="step-description">
                Engage in focused coaching sessions to work toward your goals with accountability.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="process-step">
              <div className="step-number">4</div>
              <h3 className="step-title">Implementation & Growth</h3>
              <p className="step-description">
                Apply new strategies in your daily life with ongoing support and adjustments as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {/* FAQ Item 1 */}
            <div className="faq-item">
              <h3 className="faq-question">How long are coaching sessions?</h3>
              <p className="faq-answer">
                Most coaching sessions are 60 minutes long, though some specialized services may be 45 or 90 minutes depending on their focus.
              </p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="faq-item">
              <h3 className="faq-question">How often should we meet?</h3>
              <p className="faq-answer">
                Most clients benefit from weekly or bi-weekly sessions, especially at the beginning. As you progress, we may adjust to monthly check-ins.
              </p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="faq-item">
              <h3 className="faq-question">How long does the coaching process take?</h3>
              <p className="faq-answer">
                This varies greatly by individual and goals. Some clients achieve their objectives in 2-3 months, while others benefit from 6+ months of ongoing support.
              </p>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="faq-item">
              <h3 className="faq-question">Are sessions conducted in-person or virtually?</h3>
              <p className="faq-answer">
                We offer both options. Virtual sessions are conducted via secure video conferencing, while in-person sessions are available at our office location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Book your free 30-minute consultation to discuss your goals and learn more about our services.
          </p>
          <Link to="/booking" className="btn btn-primary btn-large">Book Your Free Consultation</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;