// src/pages/SetAvailability.tsx

import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/Availability.css";

const SetAvailability: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const coachId = localStorage.getItem("userId");

  // Add/remove date from selection
  const toggleDate = (date: string) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  // Submit unavailable dates to backend
  const handleSubmit = async () => {
    if (!coachId) return;
    try {
      await api.post("/availability", {
        coachId,
        unavailableDates: selectedDates,
      });
      setMessage("✅ Availability saved successfully!");
    } catch (err) {
      console.error("Failed to save availability", err);
      setMessage("❌ Failed to save availability.");
    }
  };

  // Render a few hardcoded date buttons for demo
  const demoDates = [
    "2025-03-25",
    "2025-03-26",
    "2025-03-27",
    "2025-03-28",
    "2025-03-29",
  ];

  return (
    <div className="availability-container">
      <h2>Set Your Unavailable Dates</h2>

      <div className="date-grid">
        {demoDates.map((date) => (
          <button
            key={date}
            className={selectedDates.includes(date) ? "selected" : ""}
            onClick={() => toggleDate(date)}
          >
            {date}
          </button>
        ))}
      </div>

      <button className="save-button" onClick={handleSubmit}>
        Save Availability
      </button>

      {message && <p className="feedback-msg">{message}</p>}
    </div>
  );
};

export default SetAvailability;
