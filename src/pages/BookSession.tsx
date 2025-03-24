import React from "react";
import "../styles/BookSession.css"; // ✅ Import the CSS styles

const BookSession: React.FC = () => {
  return (
    <div className="book-session-container">
      {/* Page Title */}
      <h1>Book a Coaching Session</h1>

      {/* Description text */}
      <p>Choose a coach, date, and time to book your session. Coming soon!</p>
    </div>
  );
};

export default BookSession;
