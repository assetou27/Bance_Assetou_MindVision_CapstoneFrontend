// src/routes.tsx

// Importing React library
import React from 'react';

// Importing routing components from react-router-dom
import { Routes, Route } from 'react-router-dom';

// Importing individual page components
import Home from './pages/Home';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Appointments from './pages/Appointments';
import AddAppointment from './pages/AddAppointment';
import Login from './pages/Login';
import Register from './pages/Register';

// Main routing component defining all application routes
export default function AppRoutes() {
  return (
    <Routes>
      {/* Route for Home page */}
      <Route path="/" element={<Home />} />

      {/* Route for Services page */}
      <Route path="/services" element={<Services />} />

      {/* Route for Blog page */}
      <Route path="/blog" element={<Blog />} />

      {/* Route for listing Appointments */}
      <Route path="/appointments" element={<Appointments />} />

      {/* Route for adding a new Appointment */}
      <Route path="/appointments/add" element={<AddAppointment />} />

      {/* Route for Login page */}
      <Route path="/login" element={<Login />} />

      {/* Route for Register page */}
      <Route path="/register" element={<Register />} />
      </Routes>
    );
  }