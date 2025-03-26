// src/pages/Appointments.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Appointments.css';

interface Appointment {
  _id: string;
  date: string;
  time: string;
  description: string;
  // Add more fields if your backend returns them
}

export default function Appointments() {
  // State to hold the fetched appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // State to capture errors during the fetch
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Adjust endpoint if your backend is different
        const response = await api.get('/api/appointments');
        setAppointments(response.data);
      } catch (err: any) {
        setError('Failed to fetch appointments.');
      }
    };

    fetchAppointments();
  }, []);

  // Navigate to the "Add Appointment" page
  const handleAddAppointment = () => {
    navigate('/appointments/add');
  };

  return (
    <div className="appointments-page">
      <h1>Appointments</h1>
      {error && <p className="error">{error}</p>}

      {/* Button to add a new appointment */}
      <button className="add-appointment-btn" onClick={handleAddAppointment}>
        + Add Appointment
      </button>

      {/* Display the list of appointments */}
      <div className="appointments-list">
        {appointments.map((appt) => (
          <div key={appt._id} className="appointment-card">
            <h2>{appt.date} at {appt.time}</h2>
            <p>{appt.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
