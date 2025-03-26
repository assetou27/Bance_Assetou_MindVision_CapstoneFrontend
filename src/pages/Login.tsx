import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';

/**
 * Login Component
 * Handles user authentication with email/password
 */
const Login: React.FC = () => {
  // Get auth context
  const { login, error: authError, isAuthenticated } = useContext(AuthContext);
  
  // For redirecting after login
  const navigate = useNavigate();
  
  // Get query parameters (for redirect after login)
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
   * Handle form submission
   * 
   * @param {React.FormEvent} e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setLoading(true);
      
      // Attempt to log in
      await login(formData.email, formData.password);
      
      // Check if there's a pending booking in session storage
      const pendingBooking = sessionStorage.getItem('pendingBooking');
      if (pendingBooking && redirectPath === '/booking') {
        // Clear the pending booking
        sessionStorage.removeItem('pendingBooking');
      }
      
      // Redirect after successful login
      navigate(redirectPath);
    } catch (err) {
      // Handle login error
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Log In</h1>
            <p className="auth-subtitle">
              Welcome back! Log in to access your dashboard and manage your coaching sessions.
            </p>
          </div>
          
          {/* Error Alert */}
          {(error || authError) && (
            <Alert type="error" dismissible>
              {error || authError}
            </Alert>
          )}
          
          {/* Login Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
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
              {/* Password Reset Link */}
              <div className="password-reset-link">
                <Link to="/forgot-password">Forgot password?</Link>
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
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </div>
          </form>
          
          {/* Registration Link */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to={`/register${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;