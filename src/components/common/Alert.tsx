import React, { useState } from 'react';

/**
 * Alert component props interface
 */
interface AlertProps {
  /** Alert message or content */
  children: React.ReactNode;
  /** Alert type/variant */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Alert title */
  title?: string;
}

/**
 * Alert Component
 * Displays important messages or notifications to the user
 * Different types for different contexts (info, success, warning, error)
 */
const Alert: React.FC<AlertProps> = ({
  children,
  type = 'info',
  dismissible = false,
  className = '',
  title,
}) => {
  // State to track if alert is visible
  const [visible, setVisible] = useState(true);

  // If alert is dismissed, don't render anything
  if (!visible) {
    return null;
  }

  // Determine alert classes based on type
  const baseClass = 'alert';
  const typeClass = `alert-${type}`;
  const alertClasses = `${baseClass} ${typeClass} ${className}`.trim();

  // Get appropriate icon based on alert type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <span className="alert-icon success">✓</span>;
      case 'warning':
        return <span className="alert-icon warning">⚠</span>;
      case 'error':
        return <span className="alert-icon error">✗</span>;
      case 'info':
      default:
        return <span className="alert-icon info">ℹ</span>;
    }
  };

  return (
    <div className={alertClasses} role="alert">
      <div className="alert-content">
        {/* Alert icon */}
        {getIcon()}
        
        <div className="alert-message">
          {/* Alert title (if provided) */}
          {title && <h4 className="alert-title">{title}</h4>}
          
          {/* Alert content */}
          <div className="alert-body">{children}</div>
        </div>
      </div>
      
      {/* Dismiss button (if alert is dismissible) */}
      {dismissible && (
        <button
          className="alert-close"
          onClick={() => setVisible(false)}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;