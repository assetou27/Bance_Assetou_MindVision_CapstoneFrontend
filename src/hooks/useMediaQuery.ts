import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design with media queries
 * Tracks if a media query matches and updates on window resize
 * 
 * @param {string} query - CSS media query string
 * @returns {boolean} Whether the media query matches
 */
const useMediaQuery = (query: string): boolean => {
  // Check if window is available (for SSR compatibility)
  const getMatches = (): boolean => {
    // Return false on the server
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  // State to track if query matches
  const [matches, setMatches] = useState<boolean>(getMatches());

  /**
   * Handle change event for media query match state
   */
  const handleChange = () => {
    setMatches(getMatches());
  };

  // Add event listener for window resize and cleanup
  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    
    // Initial check
    handleChange();
    
    // Use newer event listener method if available
    if (matchMedia.addEventListener) {
      matchMedia.addEventListener('change', handleChange);
      return () => {
        matchMedia.removeEventListener('change', handleChange);
      };
    } else {
      // Fallback for older browsers
      matchMedia.addListener(handleChange);
      return () => {
        matchMedia.removeListener(handleChange);
      };
    }
  }, [query]);

  return matches;
};

// Common media query breakpoints
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)'
};

export default useMediaQuery;