// src/pages/BookSession.tsx

import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/BookSession.css';

interface Coach {
  _id: string;
  name: string;
  email: string;
}

const BookSession: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]); // List of all coaches
  const [coachId, setCoachId] = useState(''); // Selected coach ID
  const [availableDates, setAvailableDates] = useState<Date[]>([]); // Selectable days
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState('');

  const clientId = localStorage.getItem('userId');

  // 🔍 Load coaches from backend
  useEffect(() => {
    const loadCoaches = async () => {
      try {
        const res = await api.get('/auth'); // Assuming /api/auth returns list
        const onlyCoaches = res.data.filter((u: Coach) => u.role === 'coach');
        setCoaches(onlyCoaches);
        if (onlyCoaches.length > 0) {
          setCoachId(onlyCoaches[0]._id);
        }
      } catch (err) {
        console.error('Failed to load coaches', err);
      }
    };
    loadCoaches();
  }, []);

  // ⏱️ Load coach availability
  useEffect(() => {
    if (!coachId) return;
    const loadAvailability = async () => {
      try {
        const res = await api.get(`/availability/${coachId}`);
        const all = res.data.workingHours || [];
        const blocked = res.data.unavailableDates || [];
        const available = all
          .filter((d: string) => !blocked.includes(d))
          .map((d: string) => new Date(d));
        setAvailableDates(available);
      } catch (err) {
        console.error('Error loading availability', err);
      }
    };
    loadAvailability();
  }, [coachId]);

  // ✅ Book session
  const handleBook = async () => {
    if (!clientId || !selectedDate || !coachId) return;
    try {
      await api.post('/sessions', {
        clientId,
        coachId,
        date: selectedDate.toISOString(),
      });
      setMessage('✅ Session booked successfully!');
    } catch (err) {
      console.error('Booking error', err);
      setMessage('❌ Failed to book session.');
    }
  };

  return (
    <div className="book-session-page">
      <h2>Book a Coaching Session</h2>

      {/* Coach dropdown */}
      <label>Select a Coach:</label>
      <select value={coachId} onChange={(e) => setCoachId(e.target.value)}>
        {coaches.map((coach) => (
          <option key={coach._id} value={coach._id}>
            {coach.name} ({coach.email})
          </option>
        ))}
      </select>

      {/* Date Picker */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        highlightDates={availableDates}
        includeDates={availableDates}
        inline
      />

      {/* Button to confirm booking */}
      <button onClick={handleBook} className="book-button">
        Book Session
      </button>

      {/* Feedback message */}
      {message && <p className="booking-msg">{message}</p>}

      {/* Link to go back */}
      <div style={{ marginTop: '2rem' }}>
        <a href="/dashboard">⬅ Back to Dashboard</a>
      </div>
    </div>
  );
};

export default BookSession;
