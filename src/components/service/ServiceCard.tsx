import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

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
 * ServiceCard props interface
 */
interface ServiceCardProps {
  /** The service to display */
  service: Service;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ServiceCard Component
 * Displays information about a coaching service in a card format
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '' }) => {
  // Get default image placeholder if no image is provided
  const imageUrl = service.image || '/placeholder-service.jpg';
  
  // Format the price to display with 2 decimal places and correct currency symbol
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(service.price);

  // Create card footer with booking button
  const cardFooter = (
    <div className="service-card-footer">
      <div className="service-details">
        <span className="service-duration">{service.duration} minutes</span>
        <span className="service-price">{formattedPrice}</span>
      </div>
      <Link to={`/booking?service=${service._id}`} className="btn btn-primary">
        Book Now
      </Link>
    </div>
  );

  return (
    <Card
      title={service.title}
      imageSrc={imageUrl}
      imageAlt={`${service.title} coaching service`}
      footer={cardFooter}
      className={`service-card ${className}`}
      hoverable
    >
      <p className="service-description">{service.description}</p>
    </Card>
  );
};

export default ServiceCard;