import React from 'react';

/**
 * Button component props interface
 */
interface ButtonProps {
  /** The content to display inside the button */
  children: React.ReactNode;
  /** The function to call when the button is clicked */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button type (submit, button, reset) */
  type?: 'submit' | 'button' | 'reset';
  /** Button variant (primary, secondary, outline, text) */
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  /** Additional CSS classes */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
}

/**
 * Button Component
 * Reusable button with different variants and states
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  // Determine button classes based on props
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const widthClass = fullWidth ? 'btn-full' : '';
  const loadingClass = loading ? 'btn-loading' : '';
  const buttonClasses = `${baseClass} ${variantClass} ${widthClass} ${loadingClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className="btn-spinner"></span>}
      <span className={loading ? 'btn-text-with-spinner' : ''}>{children}</span>
    </button>
  );
};

export default Button;