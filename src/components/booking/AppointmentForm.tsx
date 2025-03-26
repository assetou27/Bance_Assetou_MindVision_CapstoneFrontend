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