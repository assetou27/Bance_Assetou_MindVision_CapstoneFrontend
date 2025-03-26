import React from 'react';

/**
 * Card component props interface
 */
interface CardProps {
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Card image source */
  imageSrc?: string;
  /** Card image alt text */
  imageAlt?: string;
  /** Card content */
  children: React.ReactNode;
  /** Card footer content */
  footer?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to include hover effects */
  hoverable?: boolean;
}

/**
 * Card Component
 * Reusable card container for displaying content with optional image, title, and footer
 */
const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = 'Card image',
  children,
  footer,
  className = '',
  hoverable = false,
}) => {
  // Determine card classes
  const baseClass = 'card';
  const hoverClass = hoverable ? 'card-hoverable' : '';
  const cardClasses = `${baseClass} ${hoverClass} ${className}`.trim();

  return (
    <div className={cardClasses}>
      {/* Card image (if provided) */}
      {imageSrc && (
        <div className="card-image">
          <img src={imageSrc} alt={imageAlt} />
        </div>
      )}
      
      {/* Card body */}
      <div className="card-body">
        {/* Card title and subtitle (if provided) */}
        {(title || subtitle) && (
          <div className="card-header">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        )}
        
        {/* Card content */}
        <div className="card-content">
          {children}
        </div>
      </div>
      
      {/* Card footer (if provided) */}
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;