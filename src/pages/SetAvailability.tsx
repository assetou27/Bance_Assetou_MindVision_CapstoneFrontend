// src/pages/SetAvailability.tsx

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";
import "../styles/Availability.css";

const SetAvailability: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [existingDates, setExistingDates] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const coachId = localStorage.getItem("userId");

  // ⏪ Load saved dates on mount
  useEffect(() => {
    if (!coachId) return;
    const loadExisting = async () => {
      try {
        const res = await api.get(`/availability/${coachId}`);
        const dates = res.data.unavailableDates || [];
        setExistingDates(dates);
        setSelectedDates(dates.map((d: string) => new Date(d)));
      } catch (err) {
        console.error("Failed to fetch availability", err);
      }
    };
    loadExisting();
  }, [coachId]);

  // ✅ Save to backend
  const handleSubmit = async () => {
    if (!coachId) return;
    try {
      const isoDates = selectedDates.map((d) => d.toISOString().split("T")[0]);
      await api.post("/availability", {
        coachId,
        unavailableDates: isoDates,
      });
      setMessage("✅ Availability saved successfully!");
    } catch (err) {
      console.error("Failed to save availability", err);
      setMessage("❌ Failed to save availability.");
    }
  };

  return (
    <div className="availability-container">
      <h2>Set Your Unavailable Dates</h2>

      <DatePicker
        selected={null}
        onChange={(date: Date) => {
          if (!date) return;
          const exists = selectedDates.find(
            (d) => d.toDateString() === date.toDateString()
          );
          if (exists) {
            setSelectedDates(selectedDates.filter(
              (d) => d.toDateString() !== date.toDateString()
            ));
          } else {
            setSelectedDates([...selectedDates, date]);
          }
        }}
        inline
        highlightDates={selectedDates}
      />

      <button className="save-button" onClick={handleSubmit}>
        Save Availability
      </button>

      {message && <p className="feedback-msg">{message}</p>}
    </div>
  );
};

export default SetAvailability;
