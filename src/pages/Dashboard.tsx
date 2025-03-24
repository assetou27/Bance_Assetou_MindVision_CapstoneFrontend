// src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import api from "../api/axios";
import "../styles/Dashboard.css";

interface Session {
  date: string;
  duration: number;
  coachId?: { name: string };
  clientId?: { name: string };
  status: string;
}

const Dashboard: React.FC = () => {
  const [role, setRole] = useState('');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    setRole(storedRole || '');

    if (!storedRole || !userId) return;

    const fetchSessions = async () => {
      try {
        const endpoint =
          storedRole === "coach"
            ? `/sessions/coach/${userId}`
            : `/sessions/client/${userId}`;

        const res = await api.get(endpoint);
        setSessions(res.data || []);
      } catch (err) {
        console.error("❌ Failed to load sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard ({role})</h1>

      {role === 'coach' && (
        <Link to="/availability" className="btn-availability">
          ➕ Set Availability
        </Link>
      )}

      {loading ? (
        <p>Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p>No sessions scheduled yet.</p>
      ) : (
        <ul className="session-list">
          {sessions.map((s, i) => (
            <li key={i} className="session-item">
              <strong>{new Date(s.date).toLocaleString()}</strong> —{' '}
              {role === "coach"
                ? `Client: ${s.clientId?.name || 'Unknown'}`
                : `Coach: ${s.coachId?.name || 'Unknown'}`} —{' '}
              {s.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
