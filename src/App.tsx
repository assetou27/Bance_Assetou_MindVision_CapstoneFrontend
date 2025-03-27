// src/App.tsx
import React from 'react';
// BrowserRouter is used to enable routing using the HTML5 History API.
import { BrowserRouter } from 'react-router-dom';

// Import your custom routes component (renamed as AppRoutes) which defines all the application routes.
import AppRoutes from './routes';

// Import the Navbar component that displays the navigation bar on every page.
import Navbar from './components/Navbar';

// Import the UserProvider from your authentication context.
// UserProvider makes authentication data (e.g., current user, login/logout functions) available to all components in the app.
import { UserProvider } from './hooks/UserContext';

/**
 * App Component
 * -------------
 * This is the root component of your application.
 * 
 * It wraps the entire app with:
 *   - BrowserRouter: Enables client-side routing.
 *   - UserProvider: Provides global authentication state and functions.
 *   - Navbar: Displays the navigation bar on every page.
 *   - AppRoutes: Renders the appropriate page based on the current URL.
 */
export default function App() {
  return (
    // BrowserRouter ensures that app can use the routing features provided by react-router-dom.
    <BrowserRouter>
      {/* UserProvider makes the authentication state (user data, login/logout functions) available to all nested components */}
      <UserProvider>
        {/* Navbar is placed outside the routes so that it appears on every page */}
        <Navbar />
        {/* AppRoutes contains the Route definitions and displays the appropriate page for each URL */}
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}
