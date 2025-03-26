import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';

/**
 * Register Component
 * Handles user registration with name, email, and password
 */
const Register: React.FC = () => {
  // Get auth context
  const { register, error: authError, isAuthenticated } = useContext(AuthContext);
  
  // For redirecting after registration
  const navigate = useNavigate();
  
  // Get query parameters (for redirect after registration)
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Form error state
  const [error, setError] = useState<string | null>(null);

  /**
   * Check if user is already logged in, redirect if they are
   */
  useEffect(() => {
    if (isAuthenticated()) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, redirectPath]);

  /**
   * Handle input changes in the form
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user types
    setError(null);
  };

  /**
   * Validate the form data
   * 
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = (): boolean => {
    // Check if all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  /**
   * Handle form submission
   * 
   * @param {React.FormEvent} e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Attempt to register
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      // Check if there's a pending booking in session storage
      const pendingBooking = sessionStorage.getItem('pendingBooking');
      if (pendingBooking && redirectPath === '/booking') {
        // Clear the pending booking
        sessionStorage.removeItem('pendingBooking');
      }
      
      // Redirect after successful registration
      navigate(redirectPath);
    } catch (err: any) {
      // Handle registration error
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">
              Join MindVision Coaching to book sessions and access personalized resources.
            </p>
          </div>
          
          {/* Error Alert */}
          {(error || authError) && (
            <Alert type="error" dismissible>
              {error || authError}
            </Alert>
          )}
          
          {/* Registration Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            
            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <small className="form-text">Password must be at least 8 characters long</small>
            </div>
            
            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
            
            {/* Terms and Conditions */}
            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="termsAgree"
                  name="termsAgree"
                  required
                />
                <label htmlFor="termsAgree">
                  I agree to the{' '}
                  <Link to="/terms" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
                fullWidth
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </div>
          </form>
          
          {/* Login Link */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to={`/login${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;