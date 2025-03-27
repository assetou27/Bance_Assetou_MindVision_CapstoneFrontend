// src/pages/AddAppointment.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/AddAppointment.css';

export default function AddAppointment() {
  // Local state for the appointment form
  const [formData, setFormData] = useState({
    date: '',        // e.g. "2025-04-29"
    time: '',        // e.g. "11:30"
    description: '', // e.g. "Consultation about goals"
  });

  // Error or success message
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Update form data on input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // POST to /api/appointments with the form data
      await api.post('/api/appointments', formData);
      setMessage('Appointment created successfully!');
      // Redirect back to the appointments list after a short delay
      setTimeout(() => {
        navigate('/appointments');
      }, 1000);
    } catch (err: any) {
      setMessage('Failed to create appointment. Please try again.');
    }
  };

  return (
    <div className="add-appointment-page">
      <h1>Add New Appointment</h1>
      {message && <p className="message">{message}</p>}

      <form className="appointment-form" onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the appointment"
        />

        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
}
