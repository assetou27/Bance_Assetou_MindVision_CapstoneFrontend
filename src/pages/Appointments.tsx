// src/pages/Appointments.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Appointments.css';

interface Appointment {
  _id: string;
  date: string;  // stored as an ISO string from the backend
  notes: string; // we renamed 'description' to 'notes'
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
        // GET /api/appointments
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

      <button className="add-appointment-btn" onClick={handleAddAppointment}>
        + Add Appointment
      </button>

      <div className="appointments-list">
        {appointments.map((appt) => {
          // Convert the ISO date to a local date/time
          const dateObj = new Date(appt.date);
          const dateStr = dateObj.toLocaleDateString();
          const timeStr = dateObj.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div key={appt._id} className="appointment-card">
              <h2>
                {dateStr} at {timeStr}
              </h2>
              <p>{appt.notes}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
