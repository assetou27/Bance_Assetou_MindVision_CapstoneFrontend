// src/pages/SessionListPage.tsx

import React, { useEffect, useState } from "react";
import api from "../api/axios";

interface Session {
  _id: string;
  date: string;
  coachId?: { name: string };
  clientId?: { name: string };
  status: string;
}

const SessionListPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role") || "";
    setRole(role);

    const fetchSessions = async () => {
      try {
        const endpoint =
          role === "coach"
            ? `/sessions/coach/${userId}`
            : `/sessions/client/${userId}`;
        const res = await api.get(endpoint);
        setSessions(res.data);
      } catch (err) {
        console.error("Failed to load sessions", err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="session-list-container">
      <h2>Your Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session._id}>
              📅 {new Date(session.date).toLocaleString()} — {role === "coach" ? `Client: ${session.clientId?.name}` : `Coach: ${session.coachId?.name}`} — {session.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionListPage;
