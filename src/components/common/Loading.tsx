import React from 'react';

/**
 * Loading component props interface
 */
interface LoadingProps {
  /** Loading text to display */
  text?: string;
  /** Size of the spinner */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show the full-page overlay */
  fullPage?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Loading Component
 * Displays loading spinner with optional text
 */
const Loading: React.FC<LoadingProps> = ({
  text = 'Loading...',
  size = 'medium',
  fullPage = false,
  className = '',
}) => {
  // Determine loading classes
  const baseClass = 'loading';
  const sizeClass = `loading-${size}`;
  const fullPageClass = fullPage ? 'loading-fullpage' : '';
  const loadingClasses = `${baseClass} ${sizeClass} ${fullPageClass} ${className}`.trim();

  return (
    <div className={loadingClasses}>
      <div className="loading-spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;