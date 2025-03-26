// src/routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import page components
import Home from './pages/Home';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Appointments from './pages/Appointments';
import AddAppointment from './pages/AddAppointment';
import Login from './pages/Login';
import Register from './pages/Register';

/**
 * AppRoutes Component
 * Sets up the routing for the application using React Router v6.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Render Home component at the root URL */}
      <Route path="/" element={<Home />} />

      {/* Render Services component at /services */}
      <Route path="/services" element={<Services />} />

      {/* Render Blog component at /blog */}
      <Route path="/blog" element={<Blog />} />

      {/* Render Appointments component at /appointments */}
      <Route path="/appointments" element={<Appointments />} />

      {/* Render AddAppointment component at /appointments/add */}
      <Route path="/appointments/add" element={<AddAppointment />} />

      {/* Render Login component at /login */}
      <Route path="/login" element={<Login />} />

      {/* Render Register component at /register */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
