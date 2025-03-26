/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Format a date string as a readable date
 * 
 * @param {string} dateString - Date string in ISO format (YYYY-MM-DD)
 * @returns {string} Formatted date (e.g., "January 15, 2023")
 */
export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  /**
   * Format a date and time string as a readable datetime
   * 
   * @param {string} dateString - Date string in ISO format (YYYY-MM-DD)
   * @param {string} timeString - Time string in 24-hour format (HH:MM)
   * @returns {string} Formatted date and time (e.g., "Monday, January 15, 2023 at 2:30 PM")
   */
  export const formatDateTime = (dateString: string, timeString: string): string => {
    const dateTime = new Date(`${dateString}T${timeString}`);
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    
    return new Date(dateTime).toLocaleDateString('en-US', options);
  };
  
  /**
   * Format a time string in 12-hour format
   * 
   * @param {string} timeString - Time string in 24-hour format (HH:MM)
   * @returns {string} Formatted time in 12-hour format (e.g., "2:30 PM")
   */
  export const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':').map(Number);
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  /**
   * Get tomorrow's date in ISO format (YYYY-MM-DD)
   * 
   * @returns {string} Tomorrow's date in ISO format
   */
  export const getTomorrowDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  /**
   * Get a date a specified number of days from today
   * 
   * @param {number} days - Number of days from today (can be positive or negative)
   * @returns {string} The calculated date in ISO format
   */
  export const getDateFromToday = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };
  
  /**
   * Get the day of the week for a date
   * 
   * @param {string} dateString - Date string in ISO format (YYYY-MM-DD)
   * @returns {string} Day of the week (e.g., "Monday")
   */
  export const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  };
  
  /**
   * Check if a date is in the past
   * 
   * @param {string} dateString - Date string in ISO format (YYYY-MM-DD)
   * @returns {boolean} True if the date is in the past, false otherwise
   */
  export const isDateInPast = (dateString: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    
    return date < today;
  };
  
  /**
   * Check if a date and time is in the past
   * 
   * @param {string} dateString - Date string in ISO format (YYYY-MM-DD)
   * @param {string} timeString - Time string in 24-hour format (HH:MM)
   * @returns {boolean} True if the date and time is in the past, false otherwise
   */
  export const isDateTimeInPast = (dateString: string, timeString: string): boolean => {
    const now = new Date();
    const dateTime = new Date(`${dateString}T${timeString}`);
    
    return dateTime < now;
  };
  
  /**
   * Generate an array of time slots
   * 
   * @param {number} startHour - Starting hour (24-hour format)
   * @param {number} endHour - Ending hour (24-hour format)
   * @param {number} interval - Interval in minutes
   * @returns {string[]} Array of time slots in HH:MM format
   */
  export const generateTimeSlots = (
    startHour: number = 9,
    endHour: number = 17,
    interval: number = 30
  ): string[] => {
    const slots: string[] = [];
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        slots.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    
    return slots;
  };