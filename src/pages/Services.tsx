// src/pages/Services.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Your custom Axios instance for backend calls
import '../styles/Services.css'; // The CSS for this page

/**
 * Interface representing a single Service object as returned by the backend.
 * Adjust fields to match your actual backend response (e.g., 'title', 'description', 'price').
 */
interface Service {
  _id: string;
  title: string;
  description: string;
  price?: number;
}

/**
 * Services Component
 * ------------------
 * This page fetches a list of services from the backend (GET /api/services)
 * and displays them in a grid of service cards. 
 */
export default function Services() {
  // State to store the array of services fetched from the backend
  const [services, setServices] = useState<Service[]>([]);
  // State for any errors that occur during the fetch
  const [error, setError] = useState<string | null>(null);

  /**
   * useEffect Hook
   * --------------
   * Fetches services once when the component mounts.
   */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Adjust the endpoint if your backend route is different
        const response = await api.get('/api/services');
        setServices(response.data);
      } catch (err: any) {
        setError('Failed to fetch services.');
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-page">
      <h1>Our Services</h1>

      {/* If there's an error, display it */}
      {error && <p className="error">{error}</p>}

      {/* Render each service in a "service-card" div */}
      <div className="services-list">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            {service.price && <p>Price: ${service.price}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
