/**
 * Utility functions for form validation
 */

/**
 * Validate an email address
 * 
 * @param {string} email - Email address to validate
 * @returns {boolean} True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Check if a string is empty (null, undefined, or only whitespace)
   * 
   * @param {string | null | undefined} value - String to check
   * @returns {boolean} True if the string is empty, false otherwise
   */
  export const isEmpty = (value: string | null | undefined): boolean => {
    return value === null || value === undefined || value.trim() === '';
  };
  
  /**
   * Validate a password meets minimum requirements
   * Requirements: At least 8 characters, at least one letter and one number
   * 
   * @param {string} password - Password to validate
   * @returns {boolean} True if the password is valid, false otherwise
   */
  export const isValidPassword = (password: string): boolean => {
    // At least 8 characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  /**
   * Validate that two passwords match
   * 
   * @param {string} password - Password
   * @param {string} confirmPassword - Password confirmation
   * @returns {boolean} True if the passwords match, false otherwise
   */
  export const doPasswordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };
  
  /**
   * Validate a phone number
   * Accepts formats: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
   * 
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if the phone number is valid, false otherwise
   */
  export const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneRegex.test(phone);
  };
  
  /**
   * Validate if a date is in the future
   * 
   * @param {string} date - Date string in ISO format (YYYY-MM-DD)
   * @returns {boolean} True if the date is in the future, false otherwise
   */
  export const isFutureDate = (date: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
    
    return inputDate >= today;
  };
  
  /**
   * Format a name (capitalize first letter of each word)
   * 
   * @param {string} name - Name to format
   * @returns {string} Formatted name
   */
  export const formatName = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  /**
   * Validate a URL
   * 
   * @param {string} url - URL to validate
   * @returns {boolean} True if the URL is valid, false otherwise
   */
  export const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  /**
   * Form validation for user registration
   * 
   * @param {Object} values - Form values
   * @returns {Object} Validation errors
   */
  export const validateRegistrationForm = (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const errors: Record<string, string> = {};
    
    if (isEmpty(values.firstName)) {
      errors.firstName = 'First name is required';
    }
    
    if (isEmpty(values.lastName)) {
      errors.lastName = 'Last name is required';
    }
    
    if (isEmpty(values.email)) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (isEmpty(values.password)) {
      errors.password = 'Password is required';
    } else if (!isValidPassword(values.password)) {
      errors.password = 'Password must be at least 8 characters and include at least one letter and one number';
    }
    
    if (isEmpty(values.confirmPassword)) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (!doPasswordsMatch(values.password, values.confirmPassword)) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };
  
  /**
   * Form validation for login
   * 
   * @param {Object} values - Form values
   * @returns {Object} Validation errors
   */
  export const validateLoginForm = (values: {
    email: string;
    password: string;
  }) => {
    const errors: Record<string, string> = {};
    
    if (isEmpty(values.email)) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (isEmpty(values.password)) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };
  
  /**
   * Form validation for booking appointments
   * 
   * @param {Object} values - Form values
   * @returns {Object} Validation errors
   */
  export const validateBookingForm = (values: {
    date: string;
    time: string;
    format: string;
  }) => {
    const errors: Record<string, string> = {};
    
    if (isEmpty(values.date)) {
      errors.date = 'Date is required';
    } else if (!isFutureDate(values.date)) {
      errors.date = 'Please select a future date';
    }
    
    if (isEmpty(values.time)) {
      errors.time = 'Time is required';
    }
    
    if (isEmpty(values.format)) {
      errors.format = 'Session format is required';
    }
    
    return errors;
  };