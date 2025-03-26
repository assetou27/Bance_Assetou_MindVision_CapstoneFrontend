import { useState, ChangeEvent, FormEvent } from 'react';

/**
 * Custom hook for form state management
 * Handles form data, validation, and submission
 * 
 * @template T - Type for the form values object
 * @param {T} initialValues - Initial form field values
 * @param {Function} onSubmit - Function to call when form is submitted and valid
 * @param {Function} validate - Optional validation function that returns errors object
 * @returns Form handling utilities including values, errors, and handler functions
 */
const useForm = <T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => void,
  validate?: (values: T) => Partial<Record<keyof T, string>>
) => {
  // Form values state
  const [values, setValues] = useState<T>(initialValues);
  
  // Form errors state
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  
  // Form submission status
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Special handling for checkbox inputs
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setValues({
        ...values,
        [name]: checkbox.checked
      });
    } else {
      // Handle all other input types
      setValues({
        ...values,
        [name]: value
      });
    }
    
    // Clear error for this field if it exists
    if (errors[name as keyof T]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name as keyof T];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Run validation if provided
    if (validate) {
      const validationErrors = validate(values);
      
      // If there are validation errors, set them and stop submission
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }
    
    // Set submitting status and call the onSubmit function
    setIsSubmitting(true);
    onSubmit(values);
    setIsSubmitting(false);
  };

  // Reset form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  // Set a specific form field value
  const setFieldValue = (field: keyof T, value: any) => {
    setValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Set a specific form field error
  const setFieldError = (field: keyof T, error: string) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }));
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError
  };
};

export default useForm;