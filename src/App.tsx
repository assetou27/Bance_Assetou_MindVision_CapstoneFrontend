import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/layout/PrivateRoute';

// Layout Components
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';

/**
 * Main App component that sets up routing and authentication
 * Wraps the entire application in the AuthProvider for global auth state
 * Sets up all main routes for the MindVision coaching application
 */
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          {/* Global Navigation */}
          <Navigation />
          
          {/* Main Content Area */}
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes - Require Authentication */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          
          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;